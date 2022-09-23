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
    })
   
    const images = await Image.findAll()

    bookings.forEach((book)=>{
      images.forEach((image)=>{
        if(image.spotImageId === book.Spot.id){
          if(image.previewImage === true){
            book.Spot.previewImage = image.url
          }
        }
        if(!book.Spot.previewImage){
          book.Spot.previewImage ="no preview image found"
        }
      })
    })
      

    

    res.json({bookings});
  });

  router.delete('/:bookingId',requireAuth, async (req,res)=>{
    const {user} = req
    const {bookingId} = req.params
      const existingBooking = await Booking.findOne({where:{id:bookingId, userId:user.id},})
      if (!existingBooking){
        res.status(404).json({
          message: "Booking couldn't be found",
          statusCode: 404
        })
      }
  
      await existingBooking.destroy()
  
      return res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
  
  })

  router.put('/:bookingId', requireAuth, async (req,res)=>{
    const {user} = req
    const {startDate,endDate} = req.body
const {bookingId} = req.params
    const existingBooking = await Booking.findOne({where:{id:bookingId, userId:user.id},})
    if (!existingBooking){
      res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }
    const updateBooking = await existingBooking.update({startDate,endDate})

    if(endDate<= startDate){
      res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate"
      }
    })

    }
    res.json(updateBooking)
  })
  module.exports = router;
