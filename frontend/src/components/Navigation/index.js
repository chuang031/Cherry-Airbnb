import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSolid, faBars , faUser} from '@fortawesome/free-solid-svg-icons'
import { useRef } from "react";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
let menuRef = useRef()
  const [open, setOpen] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  
  
  useEffect(()=>{
    let handleSubmit = (e)=>{
    
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
        }
      
    }
    document.addEventListener('mousedown',handleSubmit)})

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="button_items" >
        <LoginFormModal />
        <NavLink to="/signup" className='signup_link'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="container">
      <NavLink exact to="/">
        <img className="logo" src={logo}></img>
      </NavLink>

        <nav>
        <button className='log_button' onClick={()=>{setOpen(!open)}} >
        <div className='header_right'> <FontAwesomeIcon icon={faBars} className='bar'/>  
        
        <FontAwesomeIcon icon={faUser} className='user'/></div>
        </button>
    
        <div className={`dropdown-menu ${open ? 'active' :'inactive'} `} ref={menuRef} >
          <ul className= 'drop-menu'>
            <li className='dropdown-items'>
            {isLoaded }
            {sessionLinks}</li>
          </ul>
          </div>
        </nav>
        </div>


  );
}

export default Navigation;
