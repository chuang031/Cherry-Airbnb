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
  
    <div className="details_container">
      <div className="spot_name">{specificSpot.name}</div>
      <div className="city_country">
        {specificSpot.city},{specificSpot.country}
      </div>
      <img src={specificSpot.previewImage}></img>
      <Link to={`/spots/${spotId}/images`}>
        <button type="button">Show All Photos</button>
      </Link>
      <br />
      ID: {specificSpot.id}
      <br />
      User Id: {specificSpot.userId}
      <br />
      Name: {specificSpot.name}
      <br />
      Address: {specificSpot.address}
      <br />
      {specificSpot.city},{specificSpot.country}
      <br />
      Description: {specificSpot.description}
      <br />
      Price:{specificSpot.price}
      <br />
      Latitude: {specificSpot.lat}
      <br />
      Longitude:{specificSpot.lng}
      <br />
      Rating: {specificSpot.avgRating}
      <br />

      {currentUser?.id === specificSpot.userId &&(

        <Link to={`/spots/${specificSpot.id}/update`}>
        <button type="button">Update Form</button>
      </Link>
      )}

      {currentUser?.id === specificSpot.userId &&(
        <button type="button" onClick={deleteSpot}>
        Delete Spot
      </button>
      )}
  
    
      <h1>Reviews</h1>
      <SpotsReviews spot={specificSpot} />
      <CreateReviews spot={specificSpot} />
    </div>
  );
};

export default SpotById;
