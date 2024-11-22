// ProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // Initial state is null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user profile data
    axios.get('http://localhost:8081/user/profile')
      .then(response => {
        setProfile(response.data);
        setLoading(false); // Data loaded successfully
      })
      .catch(err => {
        setError('Failed to load profile. Please try again later.');
        setLoading(false); // Data loading failed
      });
  }, []);

  // Show loading state
  if (loading) {
    return <div className="text-center mt-5"><h4>Loading...</h4></div>;
  }

  // Show error message if any
  if (error) {
    return <div className="text-center mt-5"><h4>{error}</h4></div>;
  }

  // Show profile information
  if (profile) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Profile</h2>
        <div className="text-center">
          {profile.image && (
            <img
              src={`http://localhost:8081/uploads/${profile.image}`}
              alt={profile.name}
              className="img-thumbnail"
              style={{ width: '150px', height: '150px' }}
            />
          )}
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    );
  }

  return null; // Fallback if profile is still null
};

export default ProfilePage;
