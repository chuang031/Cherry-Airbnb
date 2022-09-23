const express = require("express");
const router = express.Router();

const { Spot, Image, User, Review, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");


router.delete('/:reviewImageId', requireAuth, async (req,res)=>{

    const {reviewImageId} = req.params
    const {user} = req

    const image = await Image.findOne({where:{id:reviewImageId}})

    if(!image){
        res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    await image.destroy()

    res.json({
        message: "Successfully deleted"
    })
})



module.exports = router;