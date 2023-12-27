import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageArea from "./messagearea";

const RoomDetails = () => {
  const { backendUrl } = useSelector((state) => state.backendUrl);

  const { slug } = useParams();
  const [roomData, setRoomData] = useState({ name: "", participants: [] });
  const [userData, setUserData] = useState(null);
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = () => {
    fetch(`${backendUrl}/api/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data here " + data);
        setUserData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchRoomDetails = async () => {
    console.log("Hre in fetch");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/room/rooms/${slug}/participants/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoomData({ name: data.name, participants: data.participants || [] });
    } catch (error) {
      console.error("Error fetching room details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddParticipant = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/room/rooms_participant/participant/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ slug, email: newParticipantEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchRoomDetails();
      setNewParticipantEmail("");
    } catch (error) {
      console.error("Error adding participant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
    fetchUserData();
  }, [slug]); // Removed the fetchParticipants dependency

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {console.log("Here in the  room details.")}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {roomData.name}
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Participants
        </h2>
        <ul>
          {roomData.participants.length > 0 ? (
            roomData.participants.map((participant, index) => (
              <li key={index} className="text-gray-600 text-sm mb-2">
                {participant.username} ({participant.email})
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No participants</p>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Add Participant
        </h2>
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
      {console.log(userData + "userdata here")}
      {userData && <MessageArea backendUrl={backendUrl} userData={userData} />}
    </div>
  );
};

export default RoomDetails;
