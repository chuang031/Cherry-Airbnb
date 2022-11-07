import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editASpot } from '../../../store/spotsReducer';
import { useParams } from 'react-router-dom';
import './EditSpotsForm.css'
const EditSpotsForm =()=>{
    const dispatch= useDispatch()
    const {spotId} = useParams()
    const allSpots = useSelector((state) => state.spots);
    const specificSpot = allSpots[spotId];


const [address, setAddress]= useState(specificSpot.address)
const [city, setCity]= useState(specificSpot.city)
const [state, setState]= useState(specificSpot.state)
const [country, setCountry]= useState(specificSpot.country)
const [lat,setLat]= useState(specificSpot.lat)
const [lng,setLng]= useState(specificSpot.lng)
const [name, setName]= useState(specificSpot.name)
const [description, setDescription]= useState(specificSpot.description)
const [price, setPrice]= useState(specificSpot.price)
const [previewImage, setPreviewImage]= useState(specificSpot.previewImage)
const [errors, setErrors] = useState([]);

const history = useHistory()

const handleSubmit = async (e)=>{
    e.preventDefault()
    setErrors([]);
const payload = { address,city,state,country,lat,lng,name,description,price,previewImage }
   let newSpot
try{
     newSpot= await dispatch( editASpot(spotId,payload))
     history.push(`/spots/${newSpot.id}`);
   }catch(err){
    const data = await err.json()
    setErrors([...Object.values(data.errors)])
   }
  
}

return(
    <div>
    <form className='edit-form' onSubmit={handleSubmit}>
   <h1 className='update'>Update your spot!</h1>
    <ul>
    {errors.map((error, idx) => (
      <li className='edit-errors' key={idx}>{error}</li>
    ))}
    
  </ul >

    <label>
    Name
    <input 
    type='text'
    value={name}
    required
    onChange={e=>setName(e.target.value)}
    />
    </label>

    <label>
    Address
    <input 
    type='text'
    value={address}
    required
    onChange={e=>setAddress(e.target.value)}
    />
    </label>
    
    <label>
    City
    <input 
    type='text'
    value={city}
    required
    onChange={e=>setCity(e.target.value)}
    />
    </label>

    <label>
    State
    <input 
    type='text'
    value={state}
    required
    onChange={e=>setState(e.target.value)}
    />
    </label>

    <label>
    Country
    <input 
    type='text'
    value={country}
    required
    onChange={e=>setCountry(e.target.value)}
    />
    </label>

    <label>
    Latitiude
    <input 
    type='text'
    value={lat}
    required
    onChange={e=>setLat(e.target.value)}
    />
    </label>

    <label>
    Longitude
    <input 
    type='text'
    value={lng}
    required
    onChange={e=>setLng(e.target.value)}
    />
    </label>

    <label>
    Description
    <input 
    type='text'
    value={description}
    required
    onChange={e=>setDescription(e.target.value)}
    />
    </label>

    <label>
    Price
    <input 
    type='text'
    value={price}
    required
    onChange={e=>setPrice(e.target.value)}
    />
    </label>
    
    <label>
    Images
    <input 
    type='text'
    value={previewImage}
    required
    onChange={e=>setPreviewImage(e.target.value)}
    />
    </label>

    <button className='submity' type="submit">Update Spot</button>
    </form>
    </div>

    
)

}

export default EditSpotsForm