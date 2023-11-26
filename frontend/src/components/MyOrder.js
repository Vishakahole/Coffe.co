import React, { useState, useEffect } from 'react';
import './Orders.css'
import axios from 'axios';
import Navbar from './Navbar';

const Restaurants = () => {
  const [orderItems, setOrderItems] = useState([]);
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-all-orders/${customerId}`);
        console.log(response.data);
        setOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrder();
  }, []);

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "center"}}>
//       <div style={{ flex: 0 , height:'100vh',  backgroundColor:'#F5F4F4'}}>
//         <Navbar />
//       </div>
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <h3>My Orders</h3>
//           {orderItems && orderItems.length > 0 ? (
//             <table className="order-table">
//               <thead>
//                 <tr>
//                   <th className="center-align">Order Number</th>
//                   <th className="center-align">Order Date</th>
//                   <th className="center-align">Delivery Address</th>
//                   <th className="center-align">Items</th>
//                   <th className="center-align">Total</th>
//                   <th className="center-align">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderItems
//                   .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort by order date in descending order
//                   .map((order, index) => (
//                     <tr key={index}>
//                       <td className="left-align">Order #{index + 1}</td>
//                       <td className="left-align">{new Date(order.orderDate).toLocaleString()}</td>
//                       <td className="left-align">{order.deliveryAdd}</td> {/* Display the delivery address */}
//                       <td className="left-align">
//                         <ul>
//                           {order.fooditems &&
//                             order.fooditems.map((item, itemIndex) => (
//                               <li key={itemIndex}>
//                                 {item.name} - Rs. {item.price} (Quantity: {item.quantity})
//                               </li>
//                             ))}
//                         </ul>
//                       </td>
//                       <td className="left-align">Rs. {order.total}</td>
//                       <td className="left-align">{order.status}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No orders have been placed yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
return (
  <div>
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#F5F4F4" }}>
      <div style={{ flex: 1 }}>
        <Navbar />
      </div>
      <div style={{ flex: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3 className="orName" >My Orders</h3>
        {orderItems && orderItems.length > 0 ? (
          <table className="order-table">
            <thead>
              <tr>
                <th className="center-align">Order Number</th>
                <th className="center-align">Order Date</th>
                <th className="center-align">Delivery Address</th>
                <th className="center-align">Items</th>
                <th className="center-align">Total</th>
                <th className="center-align">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderItems
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort by order date in descending order
                .map((order, index) => (
                  <tr key={index}>
                    <td className="left-align">Order #{index + 1}</td>
                    <td className="left-align">{new Date(order.orderDate).toLocaleString()}</td>
                    <td className="left-align">{order.deliveryAdd}</td> {/* Display the delivery address */}
                    <td className="left-align">
                      <ul>
                        {order.fooditems &&
                          order.fooditems.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              {item.name} - Rs. {item.price} (Quantity: {item.quantity})
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="left-align">Rs. {order.total}</td>
                    <td className="left-align">{order.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No orders have been placed yet</p>
        )}
      </div>
    </div>
  </div>
);
};


export default Restaurants;