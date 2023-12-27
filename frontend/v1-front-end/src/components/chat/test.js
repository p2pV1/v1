import React from "react";
import { useSelector } from "react-redux";

const HelloWorld = () => {
  const { backendUrl } = useSelector((state) => state.backendUrl);
  return (
    <div>
      Hello World
      {console.log("backendUrl" + backendUrl)}
    </div>
  );
};

export default HelloWorld;
