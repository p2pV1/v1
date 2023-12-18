// src/components/CreateRoom.js
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

// path('rooms/', views.room_list_create),
//     path('rooms/<int:slug>/', views.room_detail),
//     path('rooms/<slug:slug>/messages/', views.message_list_create),
//     path('rooms/participant/', views.add_participant),
// "rooms" -GET to get list of rooms/ POST to create new rooms
// "rooms/(room slug)" to get the room details
// "rooms/(room slug)/messages/" post to post new messages to room, get to get all messages from room
// "rooms/participant/" POST room slug, user email to add new participants to the room.

const CreateRoom = ({ backendUrl }) => {
  // State hooks for room details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState("no");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const apiUrl = "localhost:8080";
  // Function to handle room creation (to be implemented)
  const createRoom = async (e) => {
    e.preventDefault();

    // Construct the room data
    const roomData = {
      name: name,
      description: description,
      isPrivate: isPrivate === "yes",
    };
    try {
      // Make POST request to create a new room
      const response = await fetch(`${apiUrl}/api/room/rooms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Room created:", data);
      // Handle response or redirect the user to the created room page
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error response
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Hamburger Icon and Sidebar */}
        <div className={`relative md:hidden ${sidebarOpen ? "z-40" : "z-20"}`}>
          <button
            className={`absolute p-4 text-purple-800 transform top-0 md:top-auto transition-all duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-64" : "translate-x-0"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`transform bg-gray-800 fixed overflow-auto ease-in-out transition-all duration-300 z-30 ${
            sidebarOpen ? "translate-x-0 top-16" : "-translate-x-full top-0"
          } md:relative md:translate-x-0 w-64 h-screen`}
        >
          <Sidebar backendUrl={backendUrl} />
        </div>
        {/* Overlay for small screens when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div className="w-96 mx-auto">
          <form className="flex-1 p-4" onSubmit={createRoom}>
            <h2 className="mb-4 flex justify-center font-bold text-2xl">
              Chat Room Form
            </h2>
            <div className="flex flex-wrap -mx-3 mb-4" onSubmit={createRoom}>
              <div className="w-full px-3">
                <label
                  className="block text-gray-500 text-sm font-medium mb-1"
                  htmlFor="room name"
                >
                  Room Name:
                </label>
                <input
                  type="text"
                  className="w-96 py-3 px-4 placeholder-gray-400 text-gray-700 bg-transparent border border-gray-700 focus:border-gray-500 rounded-lg"
                  placeholder="Room Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-500 text-sm font-medium mb-1"
                  htmlFor="room description"
                >
                  Room Description:
                </label>
                <textarea
                  type="text"
                  className="py-3 px-4 w-96 placeholder-gray-400  text-gray-700 bg-transparent border border-gray-700 focus:border-gray-500 rounded-lg"
                  placeholder="Room Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <span className="text-gray-500 text-sm font-medium mb-1 mr-2">
                Private Room:
              </span>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="privacyOption"
                  value="yes"
                  checked={isPrivate === "yes"}
                  onChange={() => setIsPrivate("yes")}
                  className="form-radio h-5 w-5"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="privacyOption"
                  value="no"
                  checked={isPrivate === "no"}
                  onChange={() => setIsPrivate("no")}
                  className="form-radio h-5 w-5"
                />
                <span className="ml-2">No</span>
              </label>
            </div>

            <div className="flex flex-wrap -mx-3 mt-6 ">
              <div className="w-full px-3">
                <button className="px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg">
                  Create Room
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
