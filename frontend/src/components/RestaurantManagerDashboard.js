import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import './ResPage.css';

const RestaurantManagerDashboard = () => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    pic: null, // Use null to represent the file
    price: 0,
  });

  const managerId = localStorage.getItem('managerId');

  useEffect(() => {
    // Fetch restaurant details by manager's ID
    axios
      .get(`http://localhost:5000/api/restaurant-manager/details/${managerId}`)
      .then((response) => {
        const restaurantData = response.data;
        console.log(restaurantData);
        setRestaurantName(restaurantData.Res_name);
        console.log('menucard:', restaurantData.EmenuCard);
        setMenuItems(restaurantData.EmenuCard);
        console.log('MenuItems:', menuItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [managerId]);

  const handleUpdateRestaurantName = () => {
    // Update the restaurant's name
    axios
      .put('http://localhost:5000/api/restaurant-manager/update-restaurant-name', {
        managerId,
        name: restaurantName,
      })
      .then((response) => {
        const updatedRestaurant = response.data.restaurant;
        setRestaurantName(updatedRestaurant.name);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Create a FormData object to send the image file along with other data
  const handleAddMenuItem = () => {
    console.log('managerId:', managerId);
    console.log('food name:', newMenuItem.name);
    console.log('price:', newMenuItem.price);
    console.log('pic:', newMenuItem.pic);

    const formData = new FormData();
    formData.append('managerId', managerId);
    formData.append('name', newMenuItem.name);
    formData.append('price', newMenuItem.price);
    formData.append('pic', newMenuItem.pic);
    console.log('form: ', formData);
    // Add a menu item
    axios
      .post('http://localhost:5000/api/restaurant-manager/add-menu-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type
        },
      })
      .then((response) => {
        const updatedRestaurant = response.data.restaurant;
        setMenuItems(updatedRestaurant.EmenuCard); // Update menu items accordingly
        setNewMenuItem({
          name: '',
          pic: null,
          price: 0,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageChange = (e) => {
    // Set the selected image file in the newMenuItem state
    const file = e.target.files[0];
    setNewMenuItem({ ...newMenuItem, pic: file });
  };

  const handleLogout = () => {
    localStorage.removeItem('foodToken');
    localStorage.removeItem('managerId');
    navigate('/');

    // Reload the page to ensure the route change takes effect
    window.location.reload();
  };

  // Function to handle deleting a menu item
  const handleDeleteMenuItem = (itemId) => {
    // Send a request to delete the menu item based on the itemId
    axios
      .delete(`http://localhost:5000/api/restaurant-manager/delete-menu-item/${managerId}/${itemId}`)
      .then((response) => {
        // Update the menuItems state after successful deletion
        setMenuItems(menuItems.filter((item) => item._id !== itemId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="restaurant-dashboard">
        <h3>Restaurant Manager Dashboard</h3>
        <Button variant="light" onClick={handleLogout}>Logout</Button>
      </div>
      <div className='resDetails'>
        <h4 className="restaurant-name">Welcome ! {restaurantName}</h4>
        <input className='resname'
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <button onClick={handleUpdateRestaurantName}>Update Restaurant Name</button>
      </div>

      <div className="Add_con">
        <div className="Adding">
          <input
            type="text"
            placeholder="Food product name"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newMenuItem.price}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: Number(e.target.value) })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleAddMenuItem}>Add Menu Item</button>
        </div>
      </div>
      
      {/* <div className="restaurant-MenuItems">
        {menuItems && menuItems.length > 0 && (
          <div className="EMenu">
            <h4>Food Menu</h4>
            <div className="grid-contanier">
              {menuItems.map((item, index) => (
                <div key={index} className="menu-item">
                  <img src={`http://localhost:5000/uploads/${item.pic}`} alt={item.name} />
                  <div className="pictitle1">{item.name}</div>
                  <div className="pictitle">₹{item.price}</div>
                  <button id='delete' onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>) : (
            <p>No Menu items</p>
        )}
      </div> */}
    <div className="restaurant-MenuItems">
      {menuItems && menuItems.length > 0 ? (
        <div className="EMenu">
          <h4>Food Menu</h4>
          <div className="grid-contanier">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={`http://localhost:5000/uploads/${item.pic}`} alt={item.name} />
                <div className="pictitle1">{item.name}</div>
                <div className="pictitle">₹{item.price}</div>
                <button id='delete' onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No Menu items</p>
      )}
    </div>

    </div>
  );
};

export default RestaurantManagerDashboard;
