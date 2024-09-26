import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(name,email,password,phoneNumber);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, { 
        name, 
        email, 
        password, 
        phoneNumber 
      }).then((response)=>{
        
        toast.success(response.data.message);
        navigate('/login');
      });
      
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error('Email  already exists');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    
    <div className='SignupPage'>
      <div className='Signup-section'>
        <h2>Signup to HomeBlog</h2>
        <form className='form' onSubmit={handleSignup}>
          <label htmlFor='name' className='form-section'> Name </label>
            <input type='name' name='email' value={name} onChange={(e) => setName(e.target.value)} required/>
          <label htmlFor='email' className='form-section'> Email </label>
            <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <label htmlFor='password' className='form-section'>Password</label>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          
          <label htmlFor='phoneNumber' className='form-section'> Phone Number </label>
            <input type='phone' name='email' value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} required/>
          
          <button type='submit' className='submit' >Signup</button>
        <div className='form-section'>
          Already have an account? <a href='/login'>Login</a> Now
        </div>
        </form>
        

      </div>

    </div>
    
  );
};

export default SignupPage;
