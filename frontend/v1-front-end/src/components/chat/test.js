import React from 'react';

const HelloWorld = ({backendUrl}) => {
  return (
    <div>
      Hello World
      {console.log("backendUrl" + backendUrl)}
    </div>
  );
};

export default HelloWorld;
