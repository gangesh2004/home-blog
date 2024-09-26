import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

import { Home, Login, PersonAdd,ExitToApp, AccountCircle } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import blogHome from '../assets/blogHome.png';


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const authToken = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
  const navigate = useNavigate();
  

  
  const menuItems = [
    { label: 'HomeBlog', icon: <img src={blogHome} alt='blogHome' style={{width:"30px",height:"30px"}}/>, path: '/' ,authRequired:true},
    { label: 'Login', icon: <Login color='info'/>, path: '/login', authRequired: !authToken },
    { label: 'Signup', icon: <PersonAdd color='success'/>, path: '/signup', authRequired: !authToken },
    { label: 'Profile', icon: <AccountCircle color='info'/>, path: '/profile' , authRequired: authToken },
    { label: 'Add Blog', icon: <AddCircleOutlineIcon color='info'/>, path: '/create-blog', authRequired: authToken },
    { label: 'Logout', icon: <ExitToApp color='error'/>, path: '/logout', authRequired: authToken }
  ];

  const handleCloseDrawer = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      <AppBar position="sticky" sx={{background:"#fff",color:"black"}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" onClick={() => navigate('/')} sx={{cursor:"pointer",marginLeft:"0.2em",fontWeight: 700}}>
          
        <img src={blogHome} alt='blogHome' style={{width:"22px",height:"22px"}}/>
        HomeBlog
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
        {menuItems.map((item) => (
            (item.authRequired ) && (
              <ListItemButton key={item.label} onClick={() => handleCloseDrawer(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;


