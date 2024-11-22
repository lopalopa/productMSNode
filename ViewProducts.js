import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component
import Footer from './Footer'; // Import the Footer component
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewProducts.css'; // Custom CSS file (optional for additional styling)

function ViewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch all products from the server
        axios.get('http://localhost:8081/viewproducts')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete a product
        axios.delete(`http://localhost:8081/viewproducts/${id}`)
            .then(response => {
                alert('Product deleted successfully');
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            });
    };

    return (
        <div className="home-container">
            <Header /> {/* Render the Header component */}
            <div className="d-flex">
                <Sidebar /> {/* Render the Sidebar component */}
                <div className="home-content flex-grow-1">
                    <div className="container mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2>Product List</h2>
                            <Link to="/add-product" className="btn btn-primary">Add New Product</Link>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.description}</td>
                                            <td>
                                                {product.image && (
                                                    <img 
                                                        src={`http://localhost:8081/uploads/${product.image}`} 
                                                        alt={product.name} 
                                                        style={{ width: '100px' }} 
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/editproducts/${product.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                                                <Link to={`/viewproducts/${product.id}`} className="btn btn-info btn-sm ms-2">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

export default ViewProducts;
