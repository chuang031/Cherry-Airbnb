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


    <div className='spot_container'>


{allSpots?.map(({id, city, state , price, previewImage})=>

<div className='card' >

<Link to={`/spots/${id}`}>

<img className='card_img' src={previewImage}></img> 
<div className='card_info'>Spot #{id}: {city},{state}</div>
<div className='price_info'>${price} night</div>
</Link>


</div>)}


</div>


)}

export default SpotList