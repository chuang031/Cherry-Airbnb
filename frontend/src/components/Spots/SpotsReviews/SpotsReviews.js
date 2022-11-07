import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../../store/spotsReducer';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteAReview, getSpotReviews } from '../../../store/reviewsReducer';
import './SpotsReviews.css'
const SpotsReviews = ({spot})=>{

    const allSpotReviews = useSelector((state)=> Object.values(state.reviews))
    const currentUser = useSelector((state)=>state.session.user)
    const allSpots = useSelector((state)=> state.spots)
    const specificSpot = allSpots[spot.id]
    console.log(currentUser)
    const dispatch = useDispatch()
    const history = useHistory()


const specificReviews = allSpotReviews.filter((review)=> review.spotId === spot.id)
console.log(specificReviews, 'reviews')

    useEffect(()=>{
    //     // setReviews(specificReviews)
    //     // if(spot !== undefined){
        dispatch(getSpotReviews(spot.id))
    //     // .then(res=>setReviews(res.spotReviews))
    },[spot.id, dispatch])

    const deleteReview = async (e, id)=>{
        e.preventDefault()

        dispatch(deleteAReview(id))
        
    }


 
    return(
<div>

    {specificReviews?.map(({review,stars, spotId, userId, id})=>(
        
    <div className='review_list' >
    <div >Review Number: {id} </div>
    <div className='review_text'>Review: {review} </div>
    <div>Stars: {stars}</div>
    <div> Spot Number:{spotId}</div>
    <div> User Number: {userId} </div>

    {currentUser?.id === userId &&(
        <button className='delete_review' type="button" onClick={ (e)=> deleteReview(e, id)}>Delete Review</button>)}

</div>


))}

</div>

    )

}

export default SpotsReviews