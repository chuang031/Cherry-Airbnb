import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAReview } from '../../../store/reviewsReducer';

export const CreateReviews= ({spot, reviews, setReviews})=>{
const[stars,setStars]= useState('0')
const [review, setReview]=useState('')
const [errors, setErrors] = useState([]);
const dispatch= useDispatch()


const history= useHistory()

const handleSubmit = async (e)=>{
e.preventDefault()
let newReview
const payload = {review, stars}

    try{
    newReview = await dispatch(addAReview(payload, spot.id))
   console.log(newReview, 'new')
   setReviews([...reviews,newReview])
    history.push(`/spots/${spot.id}`)
    }catch(err){
    
        const data = await err.json()
        console.log(data, 'data')
        setErrors([ ...Object.values(data.errors)])
    
    }

}

return(

    <div>
    <form onSubmit={handleSubmit}>
    
    <ul>
    {errors.map((error, idx) => (
      <li key={idx}>{error}</li>
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
    
    
    
    </div>
)

}