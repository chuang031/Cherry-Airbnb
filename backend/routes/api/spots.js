const express = require("express");
const router = express.Router();

const { Spot, Image, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {handleValidationErrors} = require('../../utils/validation')
const { check, validationResult } = require('express-validator');

const validateSpots = [
    
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("City is required"), 
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("State is required"), 
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Country is required"), 
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Latitude is not valid"), 
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Longitude is not valid"), 
    check('name')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage("Name must be less than 50 characters"), 
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Price per day is required"),
      
    handleValidationErrors
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




router.put('/:spotId', requireAuth, validateSpots, async(req,res)=>{
    const {spotId} = req.params
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const userSpot = await Spot.findOne({where:{id:spotId}})
  
    if (!userSpot){
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    userSpot.address = address,
    userSpot.city= city,
    userSpot.state = state,
    userSpot.country = country,
    userSpot.lat= lat,
    userSpot.lng = lng,
    userSpot.name = name,
    userSpot.description = description,
    userSpot.price = price

    await userSpot.save()

    res.json(userSpot)

})

module.exports = router;
