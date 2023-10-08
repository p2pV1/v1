import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import studyImage from './assets/images/study.jpg';
import mentorshipImage from './assets/images/mentor.png';
import immigrationImage from './assets/images/immigration.jpg';
import { NavBar } from './NavBar';
import { Welcome } from './components/Welcome';
import { NextPage } from './NextPage';
import { Activities } from './Activities';
import { Categories } from './Categories';
import { ActivityDetails } from './ActivityDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import AIOutput from './components/AIOutput';

export const categories = [
  { id: 123, name: 'Study', image: studyImage },
  {
    id: 124,
    name: 'Mentorship',
    image:
      'https://www.pexels.com/photo/photo-of-professor-mentoring-his-student-6325975/',
  },
  { id: 125, name: 'Immigration', image: immigrationImage },
];

export const activities = [
  { id: 123, name: 'Art & Craft', image: studyImage },
  { id: 124, name: 'Gardening', image: mentorshipImage },
  { id: 125, name: 'Reading & Writing', image: immigrationImage },
  { id: 123, name: 'Fitness & Exercise', image: studyImage },
  { id: 124, name: 'Travel & Exploration', image: mentorshipImage },
  { id: 125, name: 'Music & Music instruments', image: immigrationImage },
];

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  // Fetch user data when the app loads
  useEffect(() => {
    // Fetch user data using the token or cookie, if available
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This will include cookies in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.data);
        setLoadingUserData(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error('Error fetching user data:', error.message);
        setLoadingUserData(false); // Mark loading as complete even in case of error
      });
  }, []);

  return (
    <Router>
      <NavBar userData={userData} /> {/* Pass user data to NavBar */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Pass user data to Welcome component with loading indicator */}
        <Route
          path="/welcome"
          element={
            loadingUserData ? (
              <p>Loading user data...</p>
            ) : (
              <Welcome userData={userData} />
            )
          }
        />
        <Route path="/category/:categoryId" element={<Activities />} />
        <Route path="/activity/:activityId" element={<ActivityDetails />} />
        <Route path="/next/:themeId" element={<NextPage />} />
      </Routes>
    </Router>
  );
}
