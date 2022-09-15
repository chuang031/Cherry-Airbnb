const express = require('express')
const router = express.Router();

const {Spot, Image, User} = require('../../db/models')

router.get('/', async (req,res)=>{
const allSpots = await Spot.findAll()

 res.json(allSpots)
})

router.get('/:userId', async(req,res)=>{
    const userId = req.params.userId
    const spots = await Spot.findByPk(userId)

    res.json(spots)
})

router.get('/:spotid', async(req,res)=>{
    const spotId = req.params.id
    const details = await Spot.findByPk(spotId,{
        include: [
            {model: Image},
            {model:User}
        ]
    })
    res.json(details)
})
module.exports = router;