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
import * as sessionActions from '../../store/session';
function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [open, setOpen] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  const demoUser=(e)=>{
    e.preventDefault()
        const credential = 'Demo-lition'
        const password = 'password'
    
        return dispatch(sessionActions.login({ credential, password }))
       
      }
  
  useEffect(()=>{
    let handleSubmit = (e)=>{
        setOpen(false)
      
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
      <div className="main_footer">
       
    
      
      </div>
        <nav>
        <button className='log_button' onClick={()=>{setOpen(!open)}} >
        <div className='header_right'> <FontAwesomeIcon icon={faBars} className='bar'/>  
        
        <FontAwesomeIcon icon={faUser} className='user'/></div>
        </button>
    
        <div className={`dropdown-menu ${open ? 'active' :'inactive'} `}  >
          <ul className= 'drop-menu'>
            <li className='dropdown-items'>
            {isLoaded }
            {sessionLinks}
         
            {!currentUser &&(
            <button className='demo-button' onClick={demoUser}>Demo User</button>
            )}
            </li>
            

          </ul>
          </div>
        </nav>

 

        </div>

        


  );
}

export default Navigation;