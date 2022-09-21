const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require("express-validator");
const sequelize = require("sequelize");

router.get("/current", requireAuth, async (req, res) => {
    const user = req.user;
    const bookings = await Booking.findAll({
      include: {
        model: Spot,
        attributes: ['id','userId','address','city','state','country','lat','lng','name','price','previewImage']
      },
       where: { userId: user.id } 
    },
    
      );


    res.json({bookings});
  });

  module.exports = router;
