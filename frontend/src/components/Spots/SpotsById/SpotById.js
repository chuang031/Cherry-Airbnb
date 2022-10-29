import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots, getSingleSpot } from '../../../store/spotsReducer';
import { useParams } from 'react-router-dom';

const SpotById = () => {
const {spotId} = useParams()
    const allSpots = useSelector((state)=> state.spots)

    const specificSpot = allSpots[spotId]

    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getSingleSpot(spotId))
    },[spotId])

    if(!specificSpot) return null
    
    return(
        <div>

        ID: {specificSpot.id}
        <br/>
        Name: {specificSpot.name}
        <br/>
        Address: {specificSpot.address}
        <br/>
        {specificSpot.city}.{specificSpot.country}
        <br/>
        Description: {specificSpot.description}
        <br/>
        Price:{specificSpot.price}
        <br/>
        Latitude: {specificSpot.lat}
        <br/>
        Longitude:{specificSpot.lng}
        </div>

    )
}

export default SpotById;