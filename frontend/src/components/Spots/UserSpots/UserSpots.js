import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../../store/spotsReducer';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteASpot } from '../../../store/spotsReducer';

const UserSpots = () =>{
    const history = useHistory()
    const dispatch= useDispatch()
const currentUser = useSelector((state)=>state.session.user)
const allSpots = useSelector((state)=> Object.values(state.spots))
const userSpots = allSpots.filter((spot)=> spot.userId === currentUser.id)
console.log(userSpots, 'helppp')

useEffect(()=>{
        dispatch(getAllSpots())
    },[dispatch])
    console.log(userSpots, 'lets see')
    const deleteSpot =  (e) => {
        e.preventDefault();

            dispatch(deleteASpot())
              
                    history.push(`/`)
                
        
            
         
      };

return(


    <div className='spot_container'>


{userSpots?.map(({id, city, state , price, previewImage})=>

<li key={id}  className='card' >
<Link to={`/spots/myspots/${id}`}></Link>


<img className='card_img' src={previewImage}></img> 
<div className='card_info'>Spot #{id}: {city},{state}</div>
<div className='price_info'>${price} night</div>

<Link to={`/spots/${id}/update`}> 
<button type="button">
Update Form
</button>

</Link>


</li>)}

</div>



)

}

export default UserSpots




