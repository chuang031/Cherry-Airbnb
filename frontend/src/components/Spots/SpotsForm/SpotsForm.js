import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { restoreCSRF } from '../../../store/csrf';
import { addASpot } from '../../../store/spotsReducer';

const SpotsForms=()=>{
const dispatch= useDispatch()

const [address, setAddress]= useState('')
const [city, setCity]= useState('')
const [state, setState]= useState('')
const [country, setCountry]= useState('')
const [lat,setLat]= useState('')
const [lng,setLng]= useState('')
const [name, setName]= useState('')
const [description, setDescription]= useState('')
const [price, setPrice]= useState('')
const [previewImage, setPreviewImage]= useState('')

const [errors, setErrors] = useState([]);

const history = useHistory()


const handleSubmit = async (e)=>{
    e.preventDefault()
    setErrors([]);
const payload = { address,city,state,country,lat,lng,name,description,price, previewImage }
let newSpot

try{
  newSpot = await dispatch(addASpot(payload))
  history.push(`/spots/${newSpot.id}`)
  
}catch(err){
  const data = await err.json()
 setErrors([ ...Object.values(data.errors)])

}



}


return(
    <div>
    <form onSubmit={handleSubmit}>
   
    <ul>
    {errors.map((error, idx) => (
      <li key={idx}>{error}</li>
    ))}
  </ul>

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
    
    <button type="submit">Create new Spot</button>

    </form>
    </div>

    
)
}

export default SpotsForms