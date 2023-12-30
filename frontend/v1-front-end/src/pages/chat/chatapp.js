import React from "react";
import ChatArea from "../../components/chat/chatarea";

const ChatApp = () => {
  return (
    <div className="min-h-screen w-full border">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row py-6 border border-gray-200 rounded shadow-lg h-screen">
          <Sidebar className="w-full sm:w-auto" />
          <ChatArea className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
