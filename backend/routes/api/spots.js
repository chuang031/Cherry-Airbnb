const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require("express-validator");

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
  handleValidationErrors,
];
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll();

  res.json(allSpots);
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

  if (!details) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
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
  const { url, preview } = req.body;
  const spot = await Spot.findOne({ where: { id: spotId } });
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const newImage = await spot.createImage({ url, preview });

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

  (userSpot.address = address),
    (userSpot.city = city),
    (userSpot.state = state),
    (userSpot.country = country),
    (userSpot.lat = lat),
    (userSpot.lng = lng),
    (userSpot.name = name),
    (userSpot.description = description),
    (userSpot.price = price);

  await userSpot.save();

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
