import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Import your components here
import Landing from './components/landing/Landing';
import { Welcome } from './components/app/welcome';
import { Categories } from './components/app/categories';
import { Activities } from './components/app/activities';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import ChatApp from './components/chat/chatapp';
import CreateRoom from './components/chat/createroom';
import RoomDetail from './components/chat/roomdetails';
import Test from './components/chat/test';
import MessageArea from './components/chat/messagearea';


// Apollo Client setup
const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarRefreshKey, setSidebarRefreshKey] = useState(0);
  const backendUrl = 'http://localhost:8080' || 'https://backend-service-rojjrgeqna-ue.a.run.app';

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    fetchUserData();
  };
   const checkAuth = () => {

   }
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
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/rooms" element={<ChatApp />} />
          <Route path="/rooms/:slug" element={<RoomDetail backendUrl={backendUrl} userData={userData} />} />
          <Route path="/rooms/:slug/chat" element={<MessageArea />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-room" element={<CreateRoom userData={userData} setSidebarRefreshKey={setSidebarRefreshKey}/>} />
          <Route path="/signin" element={<SignIn backendUrl={backendUrl} setIsAuthenticated={setIsAuthenticated} onSignInSuccess={handleSignInSuccess} />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
