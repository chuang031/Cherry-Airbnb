import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addASpot } from '../../../store/spotsReducer';

const SpotsForms=({ formType})=>{
const dispatch= useDispatch()

const [id, setId] = useState('')
const [useruId, setUserId]= useState('')
const [address, setAddress]= useState('')
const [city, setCity]= useState('')
const [state, setState]= useState('')
const [country, setCountry]= useState('')
const [lat,setLat]= useState('')
const [lng,setLng]= useState('')
const [name, setName]= useState('')
const [description, setDescription]= useState('')
const [price, setPrice]= useState('')
const [errors, setErrors] = useState([]);

const history = useHistory()
const handleSubmit = async (e)=>{
    e.preventDefault()
const payload = { address,city,state,country,lat,lng,name,description,price }
   let newSpot
try{
     newSpot= await dispatch( addASpot(payload))

   }catch(error){
console.log(error)
   }

if(newSpot){
  history.push(`/spots/${newSpot.id}`);
}
   
}
return(
    <div>
    <form onSubmit={handleSubmit}>
    <h2>{formType}</h2>
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
    onChange={e=>setName(e.target.value)}
    />
    </label>

    <label>
    Address
    <input 
    type='text'
    value={address}
    onChange={e=>setAddress(e.target.value)}
    />
    </label>
    
    <label>
    City
    <input 
    type='text'
    value={city}
    onChange={e=>setCity(e.target.value)}
    />
    </label>

    <label>
    State
    <input 
    type='text'
    value={state}
    onChange={e=>setState(e.target.value)}
    />
    </label>

    <label>
    Country
    <input 
    type='text'
    value={country}
    onChange={e=>setCountry(e.target.value)}
    />
    </label>

    <label>
    Latitiude
    <input 
    type='text'
    value={lat}
    onChange={e=>setLat(e.target.value)}
    />
    </label>

    <label>
    Longitude
    <input 
    type='text'
    value={lng}
    onChange={e=>setLng(e.target.value)}
    />
    </label>

    <label>
    Description
    <input 
    type='text'
    value={description}
    onChange={e=>setDescription(e.target.value)}
    />
    </label>

    <label>
    Price
    <input 
    type='text'
    value={price}
    onChange={e=>setPrice(e.target.value)}
    />
    </label>
    
    <input type="submit" value={formType} />
    </form>
    </div>

    
)
}

export default SpotsForms