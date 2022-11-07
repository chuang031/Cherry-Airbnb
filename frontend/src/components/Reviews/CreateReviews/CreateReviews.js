import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAReview } from '../../../store/reviewsReducer';
import { getAllSpots, getSingleSpot } from '../../../store/spotsReducer';
import './CreateReviews.css'
export const CreateReviews= ({spot})=>{
const[stars,setStars]= useState('0')
const [review, setReview]=useState('')
const [errors, setErrors] = useState([]);
const dispatch= useDispatch()
const allSpots = useSelector((state)=> state.spots)
const specificSpot = allSpots[spot.id]
const currentUser = useSelector((state) => state.session.user);
const history= useHistory()


const handleSubmit = async (e)=>{
e.preventDefault()
let newReview
const payload = {review, stars}

    try{
    newReview = await dispatch(addAReview(payload, spot.id))
//    console.log(newReview, 'new')
//    setReview([...allSpotReviews,newReview])

dispatch(getSingleSpot(spot.id))
    history.push(`/spots/${spot.id}`)
    }catch(err){
    
        const data = await err.json()

        setErrors([ ...Object.values(data.errors)])
    }

    setReview('')
    setStars('0')
}

// useEffect(()=>{
//     dispatch(getAllSpots())
// },[dispatch])

if (!specificSpot) return null;

return(

    <div>

    {currentUser?.id !== specificSpot.userId && (currentUser?.id) &&(
        <form onSubmit={handleSubmit}>
    
        <ul>
        {errors.map((error, idx) => (
          <li className='errors' key={idx}>{error}</li>
        ))}
      </ul>
    
        <label>
        Review
        <input 
        type='text'
        value={review}
        required
        onChange={e=>setReview(e.target.value)}
        />
        </label>
    
        <label>
        Stars
        <input 
        type='number'
        value={stars}
        required
        onChange={e=>setStars(e.target.value)}
        />
        </label>

            <button type="submit">Submit new Review</button>
        
       
        
    
        
        </form>
    )
    }
   
    
    
    
    </div>
)

}