import React, { useState, useEffect } from "react";

const Header = ({ backendUrl }) => {
  const [groupData, setGroupData] = useState({
    name: "",
    users: [],
  });

  useEffect(() => {
    // Fetch data from the backend using the provided backendUrl
    fetch(`${backendUrl}/rooms/your_room_slug/`, {
      method: "GET",
      credentials: "include", // Include credentials in the request
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setGroupData({
          name: data.name, // Replace 'name' with the actual field name in your data
          users: data.users, // Replace 'users' with the actual field name in your data
        });
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, [backendUrl]);

  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
          <img
            className="w-10 h-10 rounded-full"
            src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
            alt="Avatar of user"
          />
        </div>
        <div className="ml-4">
          <p className="text-grey-darkest">{groupData.name}</p>
          <p className="text-grey-darker text-xs mt-1">
            {groupData.users.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
