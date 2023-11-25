import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import studyImage from './assets/images/study.jpg';
import mentorshipImage from './assets/images/mentor.png';
import immigrationImage from './assets/images/immigration.jpg';
import { NavBar } from './NavBar';
import { Welcome } from './components/Welcome';
import { NextPage } from './NextPage';
import { Activities } from './Activities';
import { Categories } from './Categories';
import { ActivityDetails } from './ActivityDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIOutput from './components/AIOutput';
import LandingPage from './pages/LandingPage';

export const categories = [
  { id: 123, name: 'Study', image: studyImage },
  {
    id: 124,
    name: 'Mentorship',
    image: 'https://www.pexels.com/photo/photo-of-professor-mentoring-his-student-6325975/',
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

  // Access backend URL from environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    // Fetch user data when the app loads
    console.log("Backend URL:", backendUrl);

    // Construct the fetching URL and log it
    const fetchUrl = `${backendUrl}/api/user`;
    console.log("Fetching URL:", fetchUrl);

    // Fetch user data when the app loads
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then((data) => {
      setUserData(data.data);
      setLoadingUserData(false);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error.message);
      setLoadingUserData(false);
    });
  }, [backendUrl]); // Adding backendUrl as a dependency for useEffect

  return (
    <Router>
      {/* NavBar and other components */}
      <Routes>
        <Route path="/" element={<LandingPage backendUrl={backendUrl} />} />
        <Route path="/signup" element={<Signup backendUrl={backendUrl} />} />
        <Route path="/login" element={<Login backendUrl={backendUrl} />} />
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
