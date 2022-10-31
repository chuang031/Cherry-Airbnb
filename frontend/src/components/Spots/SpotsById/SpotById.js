import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteASpot, getAllSpots, getSingleSpot } from '../../../store/spotsReducer';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SpotById = () => {
const {spotId} = useParams()
    const allSpots = useSelector((state)=> state.spots)

    const specificSpot = allSpots[spotId]
   
const history = useHistory()
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getSingleSpot(spotId))
    },[spotId])

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
        <div>
        {specificSpot.Images?.map(({url})=>
        (<img src={url}></img>)
      )}

      
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

        <Link to={`/spots/${specificSpot.id}/update`}> 
<button type="button">
Update Form
</button>
<button type="button" onClick={deleteSpot}>Delete Spot</button>

</Link>
        </div>

    )
}

export default SpotById;