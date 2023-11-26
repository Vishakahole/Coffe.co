import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('foodToken');
    localStorage.removeItem('customerId');
    navigate('/');

    // Reload the page to ensure the route change takes effect
    window.location.reload();
  };

  return (
    <div style={{ width: 'max-content' , height: '100vh'}}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor:'#DD9B4D' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Customer Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
      <List>
      <ListItem button component={Link} to="/CustomerDashboard" sx={{ '&.active': { backgroundColor: '#f5f5f5' }, ':hover': { backgroundColor: '#DD9B4D' }, borderRadius: '5px' }}>
        <HomeIcon />
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/search-restaurants" sx={{ ':hover': { backgroundColor: '#DD9B4D' }, borderRadius: '5px'  }}>
        <RestaurantIcon />
        <ListItemText primary="Restaurants" />
      </ListItem>
      <ListItem button component={Link} to="/view-cart" sx={{ ':hover': { backgroundColor: '#DD9B4D' }, borderRadius: '5px' }}>
        <ShoppingCartIcon />
        <ListItemText primary=" Cart" />
      </ListItem>
      <ListItem button component={Link} to="/view-order" sx={{ ':hover': { backgroundColor: '#DD9B4D' }, borderRadius: '5px'  }}>
        <AssignmentIcon />
        <ListItemText primary=" Orders" />
      </ListItem>
      <ListItem onClick={handleLogout} button component={Link} sx={{ ':hover': { backgroundColor: '#DD9B4D' }, borderRadius: '5px'  }}>
        <LogoutIcon />
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
    </div>
  );
};

export default Navbar;