import React, { useState, useEffect } from 'react';
import './Customer.css';
import { Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({}); // State to store customer details

  useEffect(() => {
    const customerId=localStorage.getItem('customerId');
    // Make an API request to fetch customer details
    axios.get(`http://localhost:5000/api/customer/${customerId}`) // Replace with your API endpoint
      .then((response) => {
        setCustomerDetails(response.data); // Update the state with customer details
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex' , backgroundColor:'#F5F4F4'}}>
      <div style={{ flex: 0 }}>
        <Navbar />
      </div>
      {/* <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}> */}
        {/* <div>
          <h4 classNameName="restaurant-name">Customer Name: {customerDetails.name}</h4>
          <p>Email: {customerDetails.email}</p>{/* Add more customer details as needed }
        </div> */}
        <div className="container-xxl position-relative p-0">
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6  text-lg-start" id='headname'>
                            <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br/>Coffee,</h1>
                            <p className="text-white animated slideInLeft mb-4 pb-2">{customerDetails.name}</p>
                            <a href="" className="btn py-sm-3 px-sm-5 me-3 animated slideInLeft" id='Orderbut'> <Link to="/search-restaurants">Order Now</Link></a>
                        </div>
                        <div className="col-lg-6 text-lg-end overflow-hidden">
                            <img className="img-fluid" src="icons/hero.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Navbar & Hero End --> */}
    </div>

  );
};

export default CustomerDashboard;