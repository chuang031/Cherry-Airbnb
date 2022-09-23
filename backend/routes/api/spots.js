const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require("express-validator");
const sequelize = require("sequelize");

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
  let page = parseInt(req.query.page, 10);
  let size = parseInt(req.query.size, 20);

  if (Number.isNaN(page)) {
    page = 0;
  }

  if (Number.isNaN(size)) {
    size = 20;
  }

  const allSpots = await Spot.findAll({
    include: {
      model: Image,
    },
    limit: size,
    offset: size * (page - 1),
  });

  let spotList = [];

  allSpots.forEach((spot) => {
    spotList.push(spot.toJSON());
  });

  spotList.forEach((spot) => {
    spot.Images.forEach((image) => {
      // console.log(image.preview)
      if (image.previewImage === true) {
        spot.previewImage = image.url;
      }
    });

    if (!spot.previewImage) {
      spot.previewImage = "no preview image found";
    }

    delete spot.Images;
    delete spot.avgRating;
  });

  res.json({ spotList, page, size });
});

router.get("/current", requireAuth, async (req, res) => {
  const user = req.user;
  const spots = await Spot.findAll({ where: { userId: user.id } });

  res.json(spots);
});

router.delete("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const details = await Spot.findByPk(spotId);
  if (!details) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  await details.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const details = await Spot.findByPk(spotId, {
    include: [{ model: Image }, { model: User }],
  });

  const avgSpotReviews = await Spot.findByPk(spotId, {
    include: {
      model: Review,
      attributes: [],
    },
    attributes: [
      [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
    ],
    raw: true,
  });
  if (!details) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  details.avgRating = avgSpotReviews.avgRating;

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
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const ownerView = await Booking.findAll({
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
    where: { spotId: spotId },
  });

  const customerView = await Booking.findAll({
    attributes: ["spotId", "startDate", "endDate"],
    where: { spotId: spotId },
  });
  const spot = await Spot.findOne({ where: { id: spotId } });

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (user.id !== spot.userId) {
    res.json({ Bookings: customerView });
  }

  if (user.id === spot.userId) {
    res.json(ownerView);
  }
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;
  const findSpot = await Spot.findByPk(spotId);

  if (!findSpot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (findSpot.userId === userId) {
    res.status(401).json({
      message: "Unauthorized, this is your spot",
      statusCode: 401,
    });
  }

  let dateRangeArray = [
    new Date(startDate).getTime(),
    new Date(endDate).getTime(),
  ];
  //  return console.log (dateRangeArray)

  const existingBooking = await Booking.findAll({ where: { spotId } });
  // return console.log(existingBooking)

  existingBooking.forEach((booking) => {
    // return console.log(booking.startDate.getTime())

    if (
      (booking.startDate.getTime() <= dateRangeArray[0] &&
        booking.endDate.getTime() >= dateRangeArray[0]) ||
      (booking.startDate.getTime() <= dateRangeArray[1] &&
        booking.endDate.getTime() >= dateRangeArray[1]) ||
      (booking.startDate.getTime() >= dateRangeArray[0] &&
        booking.endDate.getTime() <= dateRangeArray[1])
    ) {
      res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  });
  const booked = await findSpot.createBooking({ userId, startDate, endDate });
  res.json(booked);
});
// Create a Review for a Spot
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReviews,
  async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spot = await Spot.findOne({ where: { id: spotId } });

    //Create a Review for a Spot - Error Check - Previous Review for User/Spot Already Exists
    const existingReview = await Review.findOne({ where: { spotId } });
    if (existingReview) {
      res.status(403).json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    }
    //Create a Review for a Spot - Error Check Invalid Spot Id
    if (!spot) {
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

  const edit = await userSpot.update({
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

  res.json(userSpot);
});

router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spotReviews = await Review.findAll({ where: { spotId } });
  const anyReview = await Review.findOne({ where: { spotId } });
  if (!anyReview) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.json({ spotReviews });
});
module.exports = router;
