import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login_modal">

     <div className="login-sign">
     <span> Log in </span>
     
     </div>


    <div className="login_welcome">
    
    <h1>Welcome to AirBnB (Cherry Edition)! </h1>
    </div>

    <form onSubmit={handleSubmit}>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li className='error_text' key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="submit">Log In</button>
    </form>

    </div>
  );
}

export default LoginForm;