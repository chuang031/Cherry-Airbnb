import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import logo from "../../images/logo.png";
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="container">
      <NavLink exact to="/">
        <img className="logo" src={logo}></img>
      </NavLink>

      <div className='header_right'>
        <nav>
          <ul>
            <li>{isLoaded && sessionLinks}</li>
          </ul>
        </nav>
        </div>

    </div>
  );
}

export default Navigation;
