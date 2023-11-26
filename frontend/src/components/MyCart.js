import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import Navbar from './Navbar';

const Restaurants = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(`http://localhost:5000/get-cart/${customerId}`);
        setCartItems(response.data.items[0].items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }

    fetchCart();
  }, [customerId]);

  const remove_FromCart = (itemId) => {
    // Send a request to your server to remove the item from the cart
    console.log("Item to remove:",itemId);
    axios.post(`http://localhost:5000/cart/remove-from-cart/${customerId}`, { itemId })
      .then((response) => {
        console.log("Item removed from cart");
        // Update the cartItems state after successful removal
        setCartItems(response.data.updatedItems);
        //setCartItems(response.data.items[0].items);
        //window.location.reload();
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const placeOrder = () => {
    const enteredAddress = window.prompt('Please enter your delivery address:');
    if (enteredAddress === null || enteredAddress.trim() === '') {
      alert('Delivery address cannot be empty. Please try again.');
    } else{
      setDeliveryAddress(enteredAddress);
    axios.post(`http://localhost:5000/place-order/${customerId}`, {cartItems, deliveryAddress:enteredAddress})
      .then((response) => {
        // Handle the response (e.g., show a success message)
        window.alert("Order placed Successfully");
        console.log('Order placed successfully');
        // Optionally, clear the cart after placing the order
        setCartItems([]);
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1  , backgroundColor:'#F5F4F4'}}>
          <Navbar />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <h3>My Cart</h3> */}
          <ul>
          {cartItems.length > 0 ? (
          <div className="grid-container">
            {cartItems.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={`http://localhost:5000/uploads/${item.pic}`} alt={item.name} />
                <p className="pictitle1" >{item.name}</p>
                <p className="pictitle" >₹{item.price}</p>
                {/* Add a button to remove the item */}
                <button id='remove' onClick={()=>remove_FromCart(item._id)}>Remove Item from Cart</button>  
             </div>
    ))}
  </div>
) : (
  <p>Your cart is empty.</p>
)}
 </ul>
{cartItems.length > 0 && <button onClick={placeOrder} id="placeorderbtn">Place Order</button>}
      </div>
      
    </div>
    </div>
  );
};

export default Restaurants;