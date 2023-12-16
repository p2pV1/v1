import React from "react";
import { Categories } from "./categories";

export function Welcome({ userData }) {
  return (
    <main className="content">
      <h3>Get Started with picking a few interests</h3>

      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Email: {userData.email}</p>
          <p>ID: {userData.id}</p>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>User data not available.</p>
      )}
      <Categories />
    </main>
  );
}
