// MainContent.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";

// Import your components here
import Landing from "./pages/Landing";
import { Welcome } from "./pages/app/welcome";
import { Categories } from "./pages/app/categories";
import { Activities } from "./pages/app/activities";
import { Navigate } from "react-router-dom";

import ChatApp from "./pages/chat/chatapp";
import CreateRoom from "./components/chat/createroom";
import RoomDetail from "./components/chat/roomdetails";
import MessageArea from "./components/chat/messagearea";
import Page404 from "./components/landing/ui/page404";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

export default function MainContent() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const { backendUrl } = useSelector((state) => state.backendUrl);

  const RedirectIfAuthenticated = ({ isAuthenticated, children }) => {
    if (isAuthenticated) {
      // Redirect them to the /welcome page if they are authenticated
      return <Navigate to="/welcome" replace />;
    }

    return children; // Otherwise, render the children components normally
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<Activities />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/rooms" element={<ChatApp />} />
        <Route
          path="/rooms/:slug"
          element={<RoomDetail backendUrl={backendUrl} />}
        />
        <Route path="/rooms/:slug/chat" element={<MessageArea />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Route>
      {/* Public routes */}
      <Route
        path="/signup"
        element={
          <RedirectIfAuthenticated isAuthenticated={isAuthenticated}>
            <SignUp />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signin"
        element={
          <RedirectIfAuthenticated isAuthenticated={isAuthenticated}>
            <SignIn />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
