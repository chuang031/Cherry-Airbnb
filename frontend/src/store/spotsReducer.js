
const GET_ALL_SPOTS = '/'

const loadSpots = (spots)=>{
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const getAllSpots =() => async(dispatch) =>{
    const response = await fetch ('/api/spots')

    if(response.ok){
        const data = await response.json()
        dispatch(loadSpots(data))
        return data
    }
}

const initialSpots= {}

const spotsReducer = (state=initialSpots, action) =>{
    const copy = {...state}
    switch(action.type){
        case GET_ALL_SPOTS :{
            action.spots.spotList.forEach((spot)=>(copy[spot.id]=spot))
            return copy
        }
        default:
            return state
    }
}

export default spotsReducer