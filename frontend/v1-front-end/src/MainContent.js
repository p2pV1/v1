// MainContent.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useSelector } from "react-redux";

// Import your components here
import Landing from "./components/landing/Landing";
import { Welcome } from "./components/app/welcome";
import { Categories } from "./components/app/categories";
import { Activities } from "./components/app/activities";
import ChatApp from "./components/chat/chatapp";
import CreateRoom from "./components/chat/createroom";
import RoomDetail from "./components/chat/roomdetails";
import MessageArea from "./components/chat/messagearea";
import Page404 from "./components/landing/ui/page404";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";

export default function MainContent() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const { backendUrl } = useSelector((state) => state.backendUrl);
  console.log("backend in Main Content " + backendUrl )
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
      {/* Protect routes using ProtectedRoute */}
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
        <Route path="/rooms/:slug" element={<RoomDetail backendUrl={backendUrl} />} />
        <Route path="/rooms/:slug/chat" element={<MessageArea />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Route>
      {/* Public routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
