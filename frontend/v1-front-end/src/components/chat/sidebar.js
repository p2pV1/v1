// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Sidebar = ({ refreshKey }) => {
  const [rooms, setRooms] = useState([]);
  // Use the useSelector hook to access the backendURL from the Redux store
  const { backendUrl } = useSelector((state) => state.backendUrl);
  console.log("backendUrl for sidebar" + backendUrl);
  useEffect(() => {
    const fetchRooms = async () => {
      // Use the backendURL from Redux instead of a hardcoded value
      const apiUrl = `${backendUrl}/api/room/rooms`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include any other headers you need, like Authorization
          },
          credentials: "include", // Include credentials for cross-origin requests
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched rooms:", data);
        setRooms(data); // Update the rooms state with the fetched data
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [refreshKey, backendUrl]); // Depend on refreshKey

  return (
    <aside className="w-64 bg-gray-800 h-screen overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          Available Rooms
        </h2>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.id}
              className={`text-gray-300 hover:text-white py-2 ${
                rooms.length > 1 ? "border-b border-gray-700" : ""
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
