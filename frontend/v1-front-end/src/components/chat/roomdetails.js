import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomDetails = ({ backendUrl }) => {
  const { slug } = useParams();
  const [roomData, setRoomData] = useState({
    name: "",
    room_participants: [],
    all_users: [],
  });
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/room/rooms/${slug}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoomData((prevData) => ({
        ...prevData,
        name: data.name,
        room_participants: data.room_participants || [],
      }));
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/room/users/all/`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoomData((prevData) => ({
        ...prevData,
        all_users: data.users || [],
      }));
    } catch (error) {
      console.error("Error fetching all users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
    fetchAllUsers();
  }, [backendUrl, slug]);

  const handleAddParticipant = async () => {
    try {
      setIsLoading(true);
      console.log("Adding participant with slug:", slug, "and email:", newParticipantEmail);
      const response = await fetch(`${backendUrl}/api/room/rooms/participant/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          slug: slug,
          email: newParticipantEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchRoomDetails();
      setNewParticipantEmail(""); // Clear the input field after adding a participant
    } catch (error) {
      console.error("Error adding participant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{roomData.name}</h1>
      <p className="text-gray-600 text-sm mb-4">
        Participants:{" "}
        {roomData.room_participants.length > 0
          ? roomData.room_participants.join(", ")
          : "No participants"}
      </p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">All Users</h2>
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 py-2 px-4">Email</th>
              <th className="border border-gray-300 py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomData.all_users.length > 0 ? (
              roomData.all_users.map((user) => (
                <tr key={user} className="border-b border-gray-300">
                  <td className="border border-gray-300 py-2 px-4">{user}</td>
                  <td className="border border-gray-300 py-2 px-4">
                    <button
                      onClick={() => {
                        setNewParticipantEmail(user);
                        handleAddParticipant();
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 py-2 px-4" colSpan="2">
                  No users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Participant</h2>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter email"
            value={newParticipantEmail}
            onChange={(e) => setNewParticipantEmail(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/2"
          />
          <button
            onClick={handleAddParticipant}
            disabled={isLoading}
            className={`bg-blue-500 text-white px-3 py-2 rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
