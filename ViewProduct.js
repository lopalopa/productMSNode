import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component
import Footer from './Footer'; // Import the Footer component
import 'bootstrap/dist/css/bootstrap.min.css';
//import './ViewProduct.css'; // Custom CSS file (optional for additional styling)

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    // Fetch products from the backend API when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8081/viewallproduct')
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            });
    }, []);

    return (
        <div className="home-container">
            <Header /> {/* Render the Header component */}
            <div className="d-flex">
                <Sidebar /> {/* Render the Sidebar component */}
                <div className="home-content flex-grow-1">
                    <div className="container mt-5">
                        <h2>Product List</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {products.length > 0 ? (
                            <div className="row">
                                {products.map(product => (
                                    <div key={product.id} className="col-md-4 mb-4">
                                        <div className="card">
                                            {product.image && (
                                                <img
                                                    src={`http://localhost:8081/uploads/${product.image}`}
                                                    className="card-img-top"
                                                    alt={product.name}
                                                />
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">{product.description}</p>
                                                <p className="card-text"><strong>Price: </strong>${product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

export default ViewProduct;
