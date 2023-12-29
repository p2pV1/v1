import React from "react";
import { Link } from "react-router-dom";
import { Categories } from "./categories";
import Uploadfile from "./uploadfile";
import { useSelector } from "react-redux";

export function Welcome() {
  const userEmail = useSelector((state) => state.user.userEmail);
  return (
    <main className="flex flex-col items-center min-h-screen">
      {userEmail ? (
        <div className="mt-20">
          <div className="max-w-sm w-64 mx-auto bg-white  shadow-xl hover:shadow flex items-center justify-center rounded-lg">
            <div className="px-6 py-4 text-center">
              <div className="mb-4 border-b">
                {/* Profile Image */}
                <img
                  className="w-24 h-24 mx-auto rounded-full -mt-20 border-8 border-white"
                  src="https://avatars.githubusercontent.com/u/67946056?v=4"
                  alt="Profile"
                />
              </div>
              {/* Profile Name */}
              <div className="font-bold text-xl mb-2">X</div>
              {/* User Name */}
              <div className="font-bold text-xl mb-2">XXX</div>
              {/* Location */}
              <p className="text-gray-600 text-sm">{userEmail}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>User data not available.</p>
      )}

      <div className="flex justify-center flex-col sm:flex-row ">
        <Link
          to="/create-room"
          className="bg-gray-200 h-56 w-56 object-cover mx-auto my-4 rounded-lg md:mx-4 md:my-3 flex items-center justify-center font-bold text-2xl text-purple-700 hover:text-white hover:bg-purple-600 transition duration-150 ease-in-out shadow-md"
        >
          Rooms
        </Link>
        <div className="bg-gray-200 h-56 w-56 object-cover mx-auto my-4 rounded-lg md:mx-4 md:my-3 flex items-center justify-center font-bold text-2xl text-purple-700 hover:text-white hover:bg-purple-600 transition duration-150 ease-in-out shadow-md">
          Coming Soon...
        </div>
        {/* <Categories /> */}
      </div>
      {/* <Uploadfile /> */}
      {/* <div>
        <p>Drop file below</p>
      </div> */}
    </main>
  );
}
