import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component
import Footer from './Footer'; // Import the Footer component
import 'bootstrap/dist/css/bootstrap.min.css';
//import './EditProduct.css'; // Custom CSS file (optional for additional styling)

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from URL
  const navigate = useNavigate(); // Use to redirect after editing

  const [product, setProduct] = useState({
    name: '',
    image: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the existing product data
  useEffect(() => {
    axios.get(`http://localhost:8081/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle file selection (for image upload)
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', product.name);
    if (selectedFile) {
      formData.append('image', selectedFile); // Attach image file if user uploads a new one
    }

    // Send PUT request to update product
    try {
      await axios.put(`http://localhost:8081/editproducts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/viewproducts'); // Redirect to product list page after editing
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading...</h4></div>;
  }

  return (
    <div className="home-container">
      <Header /> {/* Render the Header component */}
      <div className="d-flex">
        <Sidebar /> {/* Render the Sidebar component */}
        <div className="home-content flex-grow-1 p-4">
          <div className="container mt-5" style={{ marginLeft: '220px',marginTop:'150px',marginRight:'190px' }} >
            <h2 className="text-center mb-4">Edit Product</h2>
            <div className="table-responsive mb-5">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td>Current Image</td>
                    <td>
                      {product.image && (
                        <img 
                          src={`http://localhost:8081/uploads/${product.image}`} 
                          alt={product.name} 
                          width="100" 
                          className="img-thumbnail" 
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-light p-4 shadow rounded">
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="image" className="form-label">Product Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Update Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default EditProduct;
