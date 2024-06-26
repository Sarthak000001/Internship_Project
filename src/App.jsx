// import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import NoPage from "./pages/nopage/NoPage"
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductCard from "./pages/productInfo/ProductInfo"
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import AllProduct from "./pages/allproducts/AllProducts";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/allproducts" element={<AllProduct />}/>
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/productinfo/:id" element={<ProductCard />}/>
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          }/>
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          }/>
          <Route path="/*" element={<NoPage />}/>
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}


// For admin 
const ProtectedRouteForAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'));
  // console.log(admin)
  if(admin.user.email === import.meta.env.VITE_ADMIN_USER_EMAIL){
    return children;
  }
  else{
    return <Navigate to={'/login'} />
  }
}
// For user 
const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user');
  // console.log(user);
  if(user){
    return children;
  }
  else{
    return <Navigate to = {'/login'} />
  }
}
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
ProtectedRouteForAdmin.propTypes = {
  children: PropTypes.node,
};
export default App;
