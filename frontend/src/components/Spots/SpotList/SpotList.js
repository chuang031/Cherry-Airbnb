import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../../store/spotsReducer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faStar } from '@fortawesome/free-solid-svg-icons'
import './SpotList.css'
import Footer from '../../Footer/Footer';
const SpotList = () =>{
const dispatch = useDispatch()

const allSpots = useSelector((state)=> Object.values(state.spots))
const allSpotReviews = useSelector((state)=> Object.values(state.reviews))
// const specificSpot = allSpots[spot.id]
// const eachReview = allSpotReviews.filter(review=> review.spotId === specificSpot.id)

// const stars = eachReview.map(review=> review.stars)

// let average = stars.reduce((sum,star)=>{
//     const avg = sum + star
//     return avg
// })

// let rating = Number(average/eachReview.length).toFixed(2)

useEffect(()=>{
        dispatch(getAllSpots())
        
    },[dispatch])




return(


    <div className='spot_container'>


{allSpots?.map(({id, city, state , price, previewImage,  name})=>


<li key={id}  className='card' >

<Link to={`/spots/${id}`}>

<img className='card_img' src={previewImage}></img>
<div className='name'>{name}</div> 
<div className='card_info'>Spot #{id}: {city}, {state} </div>
<div className='price_info'>${price} night</div>
</Link>


</li> ) }


<div className="page-container">
      <div className="content-wrap">
       
      </div>
      <Footer />
    </div>

</div>





)}

export default SpotList