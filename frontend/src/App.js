import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RestaurantManagerDashboard from './components/RestaurantManagerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import SearchRestaurants from './components/SearchRestaurants'
import MyCart from './components/MyCart'
import MyOrder from './components/MyOrder'


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<><Header/><Home/></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/RestaurantManagerDashboard" element={<RestaurantManagerDashboard />} />
      <Route path="/CustomerDashboard" element={<CustomerDashboard />} />

    <Route path="/search-restaurants" element={<SearchRestaurants />} />
    <Route path="/view-cart" element={<MyCart />} />
      {/* <Route path="/view-menu/:restaurantId" element={<EMenuCard />} />  */}
      
      <Route path="/view-order" element={<MyOrder />} /> 
      {/* <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/view-receipt" element={<Receipt />} /> */}
  
  </Routes>
  );
}

export default App;
