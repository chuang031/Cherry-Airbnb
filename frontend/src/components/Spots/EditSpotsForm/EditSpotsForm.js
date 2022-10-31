import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editASpot } from '../../../store/spotsReducer';
import { useParams } from 'react-router-dom';
const EditSpotsForm =()=>{
    const dispatch= useDispatch()
    const {spotId} = useParams()
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
    setErrors([]);
const payload = { address,city,state,country,lat,lng,name,description,price }
   let newSpot
try{
     newSpot= await dispatch( editASpot(spotId,payload))

   }catch(error){
  // setErrors(error)
   }
   if(newSpot){
    history.push(`/spots/${newSpot.id}`);
  }
  setName('')
  setAddress('')
  setCity('')
  setState('')
  setCountry('')
  setLat('')
  setLng('')
  setDescription('')
  setPrice('')
  
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
    
    <button type="submit">Update Spot</button>
    </form>
    </div>

    
)

}

export default EditSpotsForm