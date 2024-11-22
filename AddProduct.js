import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProduct.css'; // Custom CSS file
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component
import Footer from './Footer'; // Import the Footer component

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('image', product.image);

        try {
            const response = await axios.post('http://localhost:8081/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product added:', response.data);
            alert('Product added successfully!');
            setProduct({
                name: '',
                price: '',
                description: '',
                image: null,
            });
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="home-container">
            <Header /> {/* Render the Header component */}
            <Sidebar /> {/* Render the Sidebar component */}
            <div className="home-content mt-5">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-header text-center bg-primary text-white mt-5">
                                    <h3>Add New Product</h3>
                                </div>
                                <div className="card-body">
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={product.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                value={product.price}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                value={product.description}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Product Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                name="image"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Add Product</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

export default AddProduct;
