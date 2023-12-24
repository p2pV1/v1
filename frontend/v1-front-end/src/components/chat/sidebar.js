// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ refreshKey }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const apiUrl = "http://localhost:8080/api/room/rooms"; // Explicitly defined API URL

      try {
        const response = await fetch(
          `${"http://localhost:8080"}/api/room/rooms`,
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
        console.log("Fetched rooms:", data);
        setRooms(data); // Update the rooms state with the fetched data
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    // Call fetchRooms when the component mounts and when refreshKey changes
    fetchRooms();
  }, [refreshKey]); // Depend on refreshKey

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
