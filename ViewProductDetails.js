import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewProductDetails = () => {
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details from the server
    axios.get(`http://localhost:8081/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading...</h4></div>;
  }

  if (!product) {
    return <div className="text-center mt-5"><h4>Product not found</h4></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Price: ${product.price}</h6>
          <p className="card-text">{product.description}</p>
          {product.image && (
            <img
              src={`http://localhost:8081/uploads/${product.image}`}
              alt={product.name}
              className="img-fluid"
            />
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <a href="/viewproducts" className="btn btn-primary">Back to Product List</a>
      </div>
    </div>
  );
};

export default ViewProductDetails;
