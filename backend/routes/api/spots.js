
const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require("express-validator");
const sequelize = require('sequelize')

const validateSpots = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Price per day is required"),

  handleValidationErrors,
];

const validateReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];


router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll( {
    include: 
    {
        model: Image
    }
})

  let spotList = []

allSpots.forEach(spot =>{ 
    spotList.push(spot.toJSON())
})

spotList.forEach( spot =>{
    spot.Images.forEach(image =>{
        // console.log(image.preview)
        if(image.previewImage === true){
            spot.previewImage = image.url
        }
    })
    if(!spot.previewImage){
        spot.previewImage = 'no preview image found'
    }
    delete spot.Images
    delete spot.avgRating
})

res.json({spotList})
 
});


router.get("/current", requireAuth, async (req, res) => {
  const user = req.user;
  const spots = await Spot.findAll({ where: { userId: user.id } });

  res.json(spots);
});

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const details = await Spot.findByPk(spotId, {
    include: [{ model: Image }, { model: User }],
  });

  const avgSpotReviews = await Spot.findByPk(spotId,{
    include: 
    {
        model: Review,
        attributes: []
    },
    attributes:[
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
    ],
    raw:true
})
if (!details) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

details.avgRating = avgSpotReviews.avgRating 

  res.json(details);
});

router.post("/", requireAuth, validateSpots, async (req, res) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  
  res.json(newSpot);
});

router.post('/:spotId/bookings', requireAuth, async (req,res)=>{
    const {spotId} = req.params
    const {startDate, endDate} = req.body
    const userId = req.user.id
    const newSpot = await Spot.findByPk(spotId)

    const booked = await newSpot.createBooking({userId ,startDate,endDate})
    if(newSpot.userId === userId){
  
        res.status(401).json({
        message: 'Unauthorized',
        statusCode: 401
        })
     
    }
    res.json(booked)
})
// Create a Review for a Spot
router.post("/:spotId/reviews",requireAuth,validateReviews,async (req, res) => {

    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spot = await Spot.findOne({ where: { id: spotId } });


//Create a Review for a Spot - Error Check - Previous Review for User/Spot Already Exists
    const existingReview = await Review.findOne({where: {spotId} })
    if(existingReview){
        res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }
 //Create a Review for a Spot - Error Check Invalid Spot Id
 if (!spot ) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

    const newReview = await spot.createReview({ userId, review, stars });
  
    res.json(newReview);
  }
);                                                                                                                                                                                                                                                                                                             

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, previewImage } = req.body;
  const spot = await Spot.findOne({ where: { id: spotId } });
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const newImage = await spot.createImage({ url, previewImage });

  res.json(newImage);
});

router.put("/:spotId", requireAuth, validateSpots, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const userSpot = await Spot.findOne({ where: { id: spotId } });

  if (!userSpot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }


const edit = await userSpot.update({address, city, state, country, lat, lng, name, description, price})

  res.json(userSpot);
});

router.get('/:spotId/reviews',async(req,res)=>{
    const {spotId} = req.params

    const spotReviews = await Review.findAll({where:{spotId}})
    const anyReview = await Review.findOne({where:{spotId}})
    if(!anyReview){
    res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    })
}
    res.json({spotReviews})
})
module.exports = router;
