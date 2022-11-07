import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots, getSingleSpot } from '../../../store/spotsReducer';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteAReview, getSpotReviews } from '../../../store/reviewsReducer';
import './SpotsReviews.css'
const SpotsReviews = ({spot})=>{

    const allSpotReviews = useSelector((state)=> Object.values(state.reviews))
    const currentUser = useSelector((state)=>state.session.user)
    const allSpots = useSelector((state)=> state.spots)
    const specificSpot = allSpots[spot.id]

    // const allUsers = useSelector((state)=>Object.values(state.user))

    // console.log(allUsers, 'user')
 
    const dispatch = useDispatch()
    const history = useHistory()


const specificReviews = allSpotReviews.filter((review)=> review.spotId === spot.id)
console.log(specificReviews, 'reviews')

    useEffect(()=>{
        // setReviews(specificReviews)
        // if(spot !== undefined){
        dispatch(getSpotReviews(spot.id))
        // .then(res=>setReviews(res.spotReviews))
    },[spot.id, dispatch])

    const deleteReview = async (e, id)=>{
        e.preventDefault()
        dispatch(deleteAReview(id))
        dispatch(getSingleSpot(spot.id))

        history.push(`/spots/${spot.id}`)
      
    }


 
    return(
        <div className='review-container'>


    {specificReviews?.map(({review,stars, spotId, userId, id})=>(
        
    <span className='review-list' key={review}>
    <div className='userid-rev'> User ID: {userId} </div> 
   
   <div className='review-rev'> Review: {review}</div> 
   <div className='star-rev'>Stars:{stars}</div> 
   <div className='spotid-rev'> Spot Number:{spotId}</div> 
   <div className='id-rev'>ID Number:{id}</div>


    {currentUser?.id === userId &&(
        <button className='delete-review' type="button" onClick={ (e)=> deleteReview(e, id)}>Delete Review</button>)}

</span>


))}


</div>
    )
 
}

export default SpotsReviews