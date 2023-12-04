import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Landing from './components/landing/Landing';
import { Welcome } from './components/app/welcome';
import { Categories } from './components/app/categories';
import { Activities } from './components/app/activities';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';

import CreateRoom from "./components/chat/createroom";
import ChatArea from "./components/chat/chatarea";
import RoomDetails from "./components/chat/roomdetails";

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const backendUrl = 'https://backend-service-rojjrgeqna-ue.a.run.app' || 'http://localhost:8080';

  // Define the handleSignInSuccess function here
  const onSignInSuccess = () => {
    console.log("in signin Succcess.")
    setIsAuthenticated(true);
    fetchUserData();
  };

  const fetchUserData = () => {
    fetch(`${backendUrl}/api/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data.data);
        setLoadingUserData(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoadingUserData(false);
      });
  };

  return (
    <Router>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome userData={userData} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<Activities />} />
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn backendUrl={backendUrl} setIsAuthenticated={setIsAuthenticated} onSignInSuccess={onSignInSuccess} />} />
          <Route path="/create-room" element={<CreateRoom backendUrl={backendUrl} />} />
          <Route path="/chat-rooms" element={<ChatArea backendUrl={backendUrl} />} />
          <Route path="/rooms/:slug" element={<RoomDetails backendUrl={backendUrl} />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
