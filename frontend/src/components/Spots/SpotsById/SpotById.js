import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteASpot,
  getAllSpots,
  getSingleSpot,
} from "../../../store/spotsReducer";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addAReview, getSpotReviews } from "../../../store/reviewsReducer";
import SpotsReviews from "../SpotsReviews/SpotsReviews";
import { CreateReviews } from "../../Reviews/CreateReviews/CreateReviews";
import { useEffect } from "react";
import { deleteAReview } from "../../../store/reviewsReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import "./SpotById.css";
const SpotById = () => {
  const { spotId } = useParams();
  // const currentUser = useSelector((state) => state.session.user);
  const allSpots = useSelector((state) => state.spots);
  const allSpotReviews = useSelector((state) => Object.values(state.reviews));
  const specificSpot = allSpots[spotId];
  const currentUser = useSelector((state) => state.session.user);
  console.log(spotId, "ss");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
    dispatch(getSingleSpot(spotId));
  }, [spotId, dispatch]);

  if (!specificSpot) return null;

  //  let image =specificSpot.Images.find(image=> image.spotImageId = specificSpot.id)
  // console.log(allSpotReviews, 'review id')
  

  console.log(currentUser, 'user')

  const deleteSpot = (e) => {
    e.preventDefault();

    dispatch(deleteASpot(spotId));

    history.push(`/`);

    
  };

 
  return (
  
    <div className="spotid_container">
      <div className="spot_name">{specificSpot.name}</div>
      <div className="city_country">
        {specificSpot.city},{specificSpot.country}
      </div>
      <div className="stars"><FontAwesomeIcon icon={faStar} />{specificSpot.avgRating?.toFixed(2)}</div>

      <div className="center_page">

      <div className="spot_image">
      <img src={specificSpot.previewImage}></img>
      </div>

      <div className="details_container">
      <li>
      Name: {specificSpot.name}
      </li>

      <li>
      ID: {specificSpot.id}
      </li>

      <li>
      User Id: {specificSpot.userId}
      </li>
   
       <li>
      Address: {specificSpot.address}
      </li>
      <li>
      {specificSpot.city}, {specificSpot.country}
      </li>
      <li>
      Description: {specificSpot.description}
      </li>
      <li>
      Price:{specificSpot.price}
      </li>
      <li>
      Latitude: {specificSpot.lat}
      </li>
      <li>
      Longitude:{specificSpot.lng}
      </li>
      <li>
      Rating: {specificSpot.avgRating?.toFixed(2)}
      </li>
    


      {currentUser?.id === specificSpot.userId &&(

        <Link to={`/spots/${specificSpot.id}/update`}>
        <button className='update_button' type="button">Update Form</button>
      </Link>
      )}

      {currentUser?.id === specificSpot.userId &&(
        <button className='delete_button' type="button" onClick={deleteSpot}>
        Delete Spot
      </button>
      )}
      </div>
      </div>



      
      <div className='review_container'>
      <h1 className="review_title">Reviews</h1>
      <div className="review_info">
      <SpotsReviews spot={specificSpot} />
      <CreateReviews spot={specificSpot} />
      </div>
      </div>
    </div>
  );
};

export default SpotById;
