import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import avatar from '../assets/avatar.png';
import { FcPositiveDynamic } from "react-icons/fc";
import { IoMdTimer } from "react-icons/io";
import { TbSum } from "react-icons/tb";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});


  useEffect(() => {
    // Fetch profile data from backend
    const fetchProfile = async () => {
      try {
        const item = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${item}`,
            },
          }
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className='profile-page'>
      <div className='profile-page-container'>
        <h1>Your Profile</h1>
        <p>
        Manage your personal information and view your published blogs through your profile page. Stay connected with the HomeBlog community and update your details as needed. Building your blog presence starts here!
        </p>
        <div className='profile-section'>
          <div className='avatar'>
            <img src={avatar} alt='img' />
          </div>
          <form className='profile-details'>

            <label htmlFor='name' className='form-details'>Name</label>
            <input name='name' type='text' value={profile.name} disabled />
            <label htmlFor='email' className='form-details'>Email</label>
            <input name='email' type='text' value={profile.email} disabled />

          </form>
        </div>
        <div className='blog-statistics'>
          <div className='blog-count'>
            <p className='blog-statistics-paragraph'> 310  <FcPositiveDynamic size={20} /> <strong>20%(from last year)</strong></p>
            <p className='blog-statistics-paragraph'> Number of Blogs</p>
          </div>
          <div className='blog-count'>
            <p className='blog-statistics-paragraph'>  <IoMdTimer size={20} /> 27th July</p>
            <p> Last Created Blogs</p>
          </div>
          <div className='blog-count'>
            <p className='blog-statistics-paragraph'> <TbSum size={20} /> 20 </p>
            <p className='blog-statistics-paragraph'>Total Number of Views</p>
          </div>

        </div>

      </div>
    </div>

  );
};

export default ProfilePage;
