// Restaurants.js (Frontend)
import React, { useState, useEffect } from 'react';
import './SearchRest.css'
import { Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import Navbar from './Navbar';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the list of restaurants and their E-MenuCards
    axios.get('http://localhost:5000/api/restaurants').then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  const addToCart = (item) => {
    const customerId=localStorage.getItem('customerId');
    console.log("customerId",customerId);
    console.log("itemId",item);
    axios.post(`http://localhost:5000/cart/add-to-cart/${customerId}`, { item }).then((response) => {
      console.log(response.data.message); // Item added to the cart
    });
    window.alert("Item added to Cart");
  };

  return (
    <div>
         <div style={{ display: 'flex'}}>
      <div style={{ flex: 1 ,   backgroundColor:'#F5F4F4'}}>
        <Navbar />
      </div>

      <div class="container-xxl position-relative p-0">
            <div class="container-xxl py-5 bg-dark hero-header1 mb-5">
                <div class="container text-center my-5 pt-5 pb-4">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">Food Menu</h1>
                </div>
            </div>
            <ul>
        {restaurants.map((restaurant) => (
          <div className='resName' key={restaurant._id}>
            <h3>{restaurant.Res_name}</h3>
            <ul>
               <div className="grid-contanier">
              {restaurant.EmenuCard.map((item) => (
                  <div key={item._id} className="menu-item">
                    <h4 className="pictitle1">{item.name}</h4>
                    <img src={`http://localhost:5000/uploads/${item.pic}`} alt={item.name} />
                    <div className="pictitle">₹{item.price}</div>
                    <button id='add' onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        ))}
      </ul> 
        </div>
      
      </div>
    </div>
  );
};

export default Restaurants;