import  { Toaster } from 'react-hot-toast';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';

import Login from './Login';
import Register from './Register';
import { AuthProvider } from './AuthProvider';

function App() {


  return (
    <div className="main1-container">
        <AuthProvider >

    <Navbar />

   <div> <Toaster/></div>
    <Routes>
    <Route path="/" element={<Main />} />

      <Route path="/Register" element={<Register />} />

      <Route path="/Login" element={<Login />} />
    </Routes>
    </AuthProvider >
  </div>
  );
}

export default App;
