import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "/spots/GET_ALL_SPOTS";

const ADD_SPOT = "/spots/ADD_SPOT";

const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const addingSpot = (spots) => {
  return {
    type: ADD_SPOT,
    spots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const list = await response.json();
    dispatch(loadSpots(list));
    return list;
  }
};

export const getSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(addingSpot(data));
    return data;
  }
};

export const addASpot = (spots) => async (dispatch) => {
  const response = await csrfFetch("/api/spots",{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(spots)
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addingSpot(data));
   return data
  }
};

const initialSpots = {};

const spotsReducer = (state = initialSpots, action) => {
  let copy = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS: {
      action.spots.spotList.forEach((spot) => {
        copy[spot.id] = spot;
      });
      return copy;
    }

    case ADD_SPOT: 
      copy[action.spots.id] = action.spots;
    return copy

    default:
      return state;
  }
};

export default spotsReducer;
