const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require("express-validator");
const user = require("../../db/models/user");

const validateReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required "),
  check("stars")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
router.put("/:reviewId", validateReviews, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const currentReview = await Review.findByPk(reviewId);

  if (!currentReview) {
    res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  const edit = await currentReview.update({ review, stars });

  return res.json(edit);
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const currentReview = await Review.findByPk(reviewId);
  if (!currentReview) {
    res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  currentReview.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url, previewImage } = req.body;
  const reviews = await Review.findOne({ where: { id: reviewId } });
  const maxImages = await Image.findAll({ where: { reviewImageId: reviewId } });

  if (maxImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  if (!reviews) {
    res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  const addImage = await reviews.createImage({ url, previewImage });
  res.json(addImage);
});

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const review = await Review.findAll({
    include:[
        {model: User, attributes: ['id','firstName','lastName']},
        {model:Spot, attributes:['id','userId','address','city','state','country','lat','lng','name','price']},
        {model: Image, attributes:['id','url']}
    ],
     where: { userId: user.id } 
  });

  res.json({ review });
});

module.exports = router;
