// App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import { AuthProvider } from "./hooks/useAuth";
import useConfigureBackend from "./hooks/useConfigureBackend";
import MainContent from "./MainContent"; // Import the new component


function App() {
  useConfigureBackend();

  return (
    <AuthProvider>
      <ApolloProvider >
        <Router>
          <MainContent /> 
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
