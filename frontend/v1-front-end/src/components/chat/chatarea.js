// ChatArea.jsx
import React from "react";
import MessageArea from "./messagearea";
import InputArea from "./inputarea";

const ChatArea = () => {
  return (
    <div className="w-2/3 border flex flex-col">
      <Header />
      <MessageArea />
      <InputArea />
    </div>
  );
};

export default ChatArea;
