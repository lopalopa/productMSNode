import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';   // Assuming you have a ViewProduct component for single product view
import ViewProducts from './ViewProducts'; // Assuming this is for listing all products
import EditProduct from './EditProduct';
import ViewProductDetails from './ViewProductDetails';
import ProfilePage from './ProfilePage'; // Import the ProfilePage component

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/profile" element={<ProfilePage />} />

        {/* Route for Login */}
        <Route path="/" element={<Login />} />

        {/* Route for Sign Up */}
        <Route path="/signUp" element={<SignUp />} />

        {/* Route for Home */}
        <Route path="/home" element={<Home />} />

        {/* Route to Add Product */}
        <Route path="/add-product" element={<AddProduct />} />

        {/* Route to View All Products */}
        <Route path="/viewproducts" element={<ViewProducts />} />

        {/* Route to View a Single Product */}
        <Route path="/viewallproduct" element={<ViewProduct />} />

        {/* Route to Edit a Product by ID */}
        <Route path="/viewproducts/:id" element={<ViewProduct />} />
        <Route path="/editproducts/:id" element={<EditProduct />} />
        <Route path="/viewproducts/:id" element={<ViewProductDetails />} /> {/* Ensure this path matches */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
