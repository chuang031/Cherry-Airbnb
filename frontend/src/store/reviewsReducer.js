import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "/spots/GET_ALL_REVIEWS";

const ADD_REVIEW = "/spots/ADD_REVIEW";

const REMOVE_REVIEW='/spots/REMOVE_REVIEW'

const loadReviews = (reviews, spotId) => {
    return {
      type: GET_ALL_REVIEWS,
      reviews,
      spotId
    };
  };
  
  const addingReview = (reviews, spotId) => {
    return {
      type: ADD_REVIEW,
      reviews,
      spotId
    };
  };
  
  const removeReview =(reviewId)=>{
    return{
      type: REMOVE_REVIEW,
      reviewId
    }
  }

  export const getSpotReviews= (spotId) => async (dispatch) => {

    console.log(spotId, 'hi')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  
    if (response.ok) {
      const reviews = await response.json();
     
      dispatch(loadReviews(reviews, spotId));
    //   console.log(reviews,'reviews')
      return reviews;
      
    }
  };

  export const addAReview = (reviews, spotId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(reviews)
      })
    
      if (response.ok) {
        const data = await response.json();
    
        dispatch(addingReview(data, spotId));
       return data
      }
  }

  export const deleteAReview = (reviewId)=> async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/${reviewId}/`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (response.ok){
        dispatch(removeReview(reviewId))
    }
  }

  const initialReviews = {};
  const reviewsReducer = (state= initialReviews, action)=>{
    let copy ={...state}
    switch(action.type){
        case GET_ALL_REVIEWS:
            action.reviews.spotReviews.forEach((review) => {
                copy[review.id] = review;
              });
     
              return copy;

        case ADD_REVIEW:
            copy[action.reviews.spotId] = action.reviews
            return copy

        case REMOVE_REVIEW:
            delete copy[action.reviewId]

            default:
                return state;

    }
  }

  export default reviewsReducer