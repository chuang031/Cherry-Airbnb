import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteASpot, getAllSpots, getSingleSpot } from '../../../store/spotsReducer';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getSpotReviews } from '../../../store/reviewsReducer';
import SpotsReviews from '../SpotsReviews/SpotsReviews';
import { CreateReviews } from '../../Reviews/CreateReviews/CreateReviews';


const UserSpotDetails = () => {
const {spotId} = useParams()
const [reviews,setReviews]= useState([])
    const allSpots = useSelector((state)=> state.spots)

    const specificSpot = allSpots[spotId]
   
console.log(specificSpot, 'ss')

const history = useHistory()
    const dispatch= useDispatch()

    // useEffect(()=>{
    //     dispatch(getSpotReviews(spotId))
    // },[spotId,dispatch])

   
    if(!specificSpot) return null
    
//  let image =specificSpot.Images.find(image=> image.spotImageId = specificSpot.id)
//   console.log(specificSpot.Images)

  const deleteSpot = async (e) => {
    e.preventDefault();
   console.log(spotId)
        dispatch(deleteASpot(spotId)).then(()=>{
            
            dispatch(getAllSpots()).then((res)=>{
                console.log(res)
                history.push(`/`)
            })
         
        })
     
  };

    return(
        <div className='details_container'>
        <div className='spot_name'>{specificSpot.name}</div>
        <div className='city_country'>{specificSpot.city},{specificSpot.country}</div>

        <img src={specificSpot.previewImage}></img>
      

<Link to={`/spots/${specificSpot.id}/images`}> 
<button type="button">
Show All Photos
</button>
</Link>

        <br/>
        ID: {specificSpot.id}
        <br/>
        Name: {specificSpot.name}
        <br/>
        Address: {specificSpot.address}
        <br/>
        {specificSpot.city},{specificSpot.country}
        <br/>
        Description: {specificSpot.description}
        <br/>
        Price:{specificSpot.price}
        <br/>
        Latitude: {specificSpot.lat}
        <br/>
        Longitude:{specificSpot.lng}
        <br/>
        Rating: {specificSpot.avgRating}
        <br/>
        
        <Link to={`/spots/${specificSpot.id}/update`}> 
<button type="button">
Update Form
</button>
</Link>

<button type="button" onClick={deleteSpot}>Delete Spot</button>




<div>
<h1>Reviews</h1>

<SpotsReviews spot={specificSpot} reviews={reviews} setReviews={setReviews} /> 



<CreateReviews spot={specificSpot} reviews={reviews} setReviews={setReviews}/>




</div>
        </div>

        

    )
}

export default UserSpotDetails