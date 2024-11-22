import React from 'react';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

function Home() {
    return (
        <div className="home-container">
            <Sidebar /> {/* Render the Sidebar component */}
            <Header /> {/* Render the Header component */}
            <div className="home-content">
            <div className="container" style={{ height: '600px', marginLeft: '340px',marginTop:'150px' }}>
            <h1>Welcome to Your Dashboard</h1>
                    <p>Hello, Welcome back.</p>

                    <img 
                        src={`http://localhost:8081/uploads/new.jpeg`} 
                        alt="Dashboard" 
                        style={{ width: '50%', height: '50%', borderRadius: '8px' }} 
                    />

                </div>
            </div>
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

export default Home;
