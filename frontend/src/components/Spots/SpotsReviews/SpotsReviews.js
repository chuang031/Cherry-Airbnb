import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../../store/spotsReducer';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteAReview, getSpotReviews } from '../../../store/reviewsReducer';

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
        // setReviews(specificReviews)
        // if(spot !== undefined){
        dispatch(getSpotReviews(spot.id))
        // .then(res=>setReviews(res.spotReviews))
    },[spot.id, dispatch])

    const deleteReview = async (e, id)=>{
        e.preventDefault()
console.log(id, 'delete')

        dispatch(deleteAReview(id))
        
    }


 
    return(
<ul>

    {specificReviews?.map(({review,stars, spotId, userId, id})=>(
        
    <li key={review}>id:{id}, {review}, Stars:{stars}, spot:{spotId}, user: {userId} 

    {currentUser?.id === userId &&(
        <button type="button" onClick={ (e)=> deleteReview(e, id)}>Delete Review</button>)}

</li>


))}

</ul>

    )

}

export default SpotsReviews