// SearchBar.jsx
import React from "react";

const SearchBar = () => {
  return (
    <div className="py-2 px-2 bg-grey-lightest border border-grey rounded-lg">
      <input
        type="text"
        className="w-full px-2 py-2 text-sm"
        placeholder="Search or start new chat"
      />
    </div>
  );
};

export default SearchBar;
