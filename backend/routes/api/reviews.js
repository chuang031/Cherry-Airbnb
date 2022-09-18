const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {handleValidationErrors} = require('../../utils/validation')
const { check, validationResult } = require('express-validator');



router.post('/:reviewId/images',requireAuth,async (req,res)=>{
   
    const {reviewId} = req.params
    const {url,preview} = req.body
    const reviews = await Review.findOne({ where: { id:reviewId } });
    const maxImages = await Image.findAll({where:{reviewImageId:reviewId}})
   
    if(maxImages.length >= 10 ){
        return res.status(403).json({
             message: "Maximum number of images for this resource was reached",
               statusCode: 403
             })
     }
    if (!reviews){
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    const addImage = await reviews.createImage({url,preview})
    res.json(addImage);

})

router.get('/current', requireAuth, async (req,res)=>{
    const {user} = req

    const review = await Review.findAll({where:{userId:user.id}})

    res.json({review})
})



module.exports = router