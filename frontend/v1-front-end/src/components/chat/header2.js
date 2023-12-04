import React from "react";

//header of chat
// TODO: delete later
const Header = () => {
  // ...add your header content here
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
          <p className="text-grey-darkest">Test Group</p>
          <p className="text-grey-darker text-xs mt-1">
            User 1, User 2, User 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
