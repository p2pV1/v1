import React from "react";
import Header from "./header2";
import SearchBar from "./searchbar";
import PeopleList from "./peoplelist";

// Sidebar of chat
// TODO: delete later
const Sidebar = () => {
  return (
    <div className=" flex flex-col ">
      <Header />
      <SearchBar />
      <PeopleList />
    </div>
  );
};

export default Sidebar;
