import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';


function Register() {

  const apiUrl = "http://localhost:5100/api/url";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', { username, password, email });
    signupbtn();
  }; 

  const signupbtn = () => { 

    const data={username,password,email}
    axios.post(`${apiUrl}/register`,{data} )
      .then((res) => {
        console.log(res.data);
        // If registration is successful, clear inputs and display success message
        setUsername('');
        setPassword('');
        setEmail('');
        setSuccess('Registration successful!');
        setError('');
       
      })
      .catch((err) => {
        console.error(err);
        setError('Registration failed. Please try again.'); // Set error message
        setSuccess(''); // Clear any previous success messages
      });
  };

  return (
    <div className='Login-container'>
      <form className="form" style={{ width: "400px", marginTop: "50px" }} onSubmit={handleSubmit}>
        <p id="heading">Register</p>
        
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM0 16s1-3 8-3 8 3 8 3v-1s-1-2-8-2-8 2-8 2v1z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Username"
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Email"
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btn">
          <button type="submit" className="button2">Sign Up</button>
        </div>
        <button type="button" className="button3">Forgot Password</button>
      </form>
    </div>
  );
}

export default Register;
