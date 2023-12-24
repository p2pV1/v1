// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// path('rooms/', views.room_list_create),
//     path('rooms/<int:slug>/', views.room_detail),
//     path('rooms/<slug:slug>/messages/', views.message_list_create),
//     path('rooms/participant/', views.add_participant),
// "rooms" -GET to get list of rooms/ POST to create new rooms
// "rooms/(room slug)" to get the room details
// "rooms/(room slug)/messages/" post to post new messages to room, get to get all messages from room
// "rooms/participant/" POST room slug, user email to add new participants to the room.

const Sidebar = ({ backendUrl }) => {
  // Static list of public group chats for demonstration.
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${backendUrl || "http://localhost:8080"}/api/room/rooms`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include any other headers you need, like Authorization
            },
            credentials: "include", // Include credentials for cross-origin requests
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching public chats:", error);
      }
    };

    fetchRooms();
  }, [backendUrl]);

  // Fetch room details from backend
  return (
    <aside className="w-64 bg-gray-800 h-screen overflow-auto">
      {/* Public Group Chats List */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          Available Rooms
        </h2>
        <ul>
          {rooms.map((room, index) => (
            <li
              key={room.id}
              className={`text-gray-300 hover:text-white py-2 ${
                index < rooms.length - 1 ? "border-b border-gray-700" : ""
              }`}
            >
              <Link to={`/rooms/${room.slug}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
