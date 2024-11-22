// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li>                    <Link to="/add-product">Add Product</Link> {/* Link to Add Product */}
        </li>
        <li><Link to="/viewallproduct">View Product</Link></li>
        <li><Link to="/viewproducts">View Products</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
