import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../../store/spotsReducer';
import { Link } from 'react-router-dom';
import './SpotList.css'
const SpotList = () =>{
const dispatch = useDispatch()

const allSpots = useSelector((state)=> Object.values(state.spots))
console.log(allSpots)

useEffect(()=>{
        dispatch(getAllSpots())
    },[dispatch])
    return(
<div>

<ul>

{allSpots?.map(({id, city, state , previewImage})=>

(<li><Link to={`/spots/${id}`}><img src={previewImage}></img> Spot #{id}: {city},{state}</Link></li>)

    )}

</ul>
</div>

    )
}

export default SpotList