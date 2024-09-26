import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password })
      .then((response)=>{
        // console.log(response);
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE,response.data.token);
        toast.success("Logging in...");
        navigate('/profile');
        
      })
      // Handle login success (e.g., save token, navigate to profile)
      
    } catch (error) {

      if (error.response && error.response.status === 400) {
        const errorMessage = error.message;
        // console.log(errorMessage)
        toast.error('Invalid Credentials',errorMessage);

      } else {
        
        toast.error('Failed to reach the server, Please try again after some time.');
      }
    }
  };

  return (
    <div className='loginPage'>
      <div className='login-section'>
        <h2>Login to HomeBlog</h2>
        <form className='form' onSubmit={handleLogin}>
          <label htmlFor='email' className='form-section'> Email </label>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          
          <label htmlFor='password' className='form-section'>Password</label>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          
          <button type='submit' className='submit' >Login</button>
        <div className='form-section'>
          Does not have an account? <a href='/signup'>Sign up</a> Now
        </div>
        </form>
        

      </div>

    </div>
    
    
  );
};

export default LoginPage;
