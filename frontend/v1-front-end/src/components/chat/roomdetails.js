// src/components/RoomDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomDetails = ({backendUrl}) => {
  const [room, setRoom] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(
         `${backendUrl}/api/room/rooms/${slug}/` || `http://localhost:8080/api/room/rooms/${slug}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [slug]);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-lg ">{room.name}</h2>
      <p className="text-gray-600">{room.description}</p>
    </div>
  );
};

export default RoomDetails;
