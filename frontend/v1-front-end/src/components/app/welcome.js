import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import avatar from "../../assets/avatars/avatar_1_mainprofile.svg";

export function Welcome() {
  const userEmail = useSelector((state) => state.user.userEmail);
  return (
    <main className="">
      {userEmail ? (
        <div className="mt-40">
          <div className=" max-w-sm w-64 mx-auto bg-white  shadow-xl hover:shadow flex items-center justify-center rounded-lg">
            <div className="px-6 py-4 text-center">
              <div className="mb-4 border-b">
                {/* Profile Image */}
                <img
                  className="w-24 h-24 mx-auto rounded-full -mt-20 border-8 border-white"
                  src={avatar}
                  alt="Profile Image"
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
