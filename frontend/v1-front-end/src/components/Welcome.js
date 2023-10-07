import React, { useState, useEffect } from 'react';
import { Categories } from "../Categories";

export function Welcome() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('auth_token');

    console.log(token);

    // Fetch user data using the token
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Failed to fetch user data');
        });
      }
      return response.json();
    })
    .then(data => {
      // Set the user data to the state
      setUserData(data.data); // Accessing the nested 'data' property from the response
    })
    .catch(error => {
      console.error('Error fetching user data:', error.message);
    });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <main className="content">
      <h3>Get Started with picking a few interests</h3>
      
      {userData && (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
          <p>ID: {userData.id}</p>
          {/* Display other user data as needed */}
        </div>
      )}

      <Categories />
    </main>
  );
}
