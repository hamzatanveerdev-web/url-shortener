import React, { useEffect,useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
const [check,setcheck]=useState(false);
const [user,setuser]=useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('authToken');
    setcheck(false);
    navigate('/login'); 
  };

  useEffect(() => {
    const token = Cookies.get('authToken');
    const user = Cookies.get('user');
    if (token) {
      setuser(user);
      console.log(user);
      setcheck(true);
    } else {
      setcheck(false);
    }
    },[isLoggedIn])
  return (
    <nav className="navbar px-3 py-3">
      <div className="navbar-logo">
        <h1 className='logo'>Linkly</h1>
      </div>
      <ul>
       
            <div className="navbar-buttons">
{check?<><button className="btn-login" ><span style={{color:"rgb(167, 167, 167)"}}>Welcome</span> {user}</button><NavLink to="/Login" className="btn-login" onClick={handleLogout}>Logout</NavLink></>:
 <><NavLink to="/login" className="btn-login">Login</NavLink>
  <NavLink to="/register" className="btn-register">Register</NavLink></>
}
</div>
             
        
      </ul>

    </nav>
  );
};

export default Navbar;
