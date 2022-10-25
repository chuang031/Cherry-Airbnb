import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spotsReducer';
import { Link } from 'react-router-dom';
const SpotList = () =>{
const dispatch = useDispatch()

const allSpots = useSelector((state)=> Object.values(state.spots))
    useEffect(()=>{
        dispatch(getAllSpots())
    },[dispatch])
    return(
<div>
<li>
{allSpots?.map(({id, name, address })=>
<Link to={`/spots/${id}`}>Spot #{id}: {name},{address}</Link>

    )}
</li>
</div>

    )
}

export default SpotList