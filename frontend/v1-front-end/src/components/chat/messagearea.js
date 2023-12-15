import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MessageArea = ({ backendUrl, userData }) => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  const sendMessage = async () => {
    // Implement the logic for sending a message here
    // You can use the WebSocket or make an API request to send the message
    // Update the state or perform the necessary actions
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: newMessage, user: userData.id }));
      setNewMessage('');
    }
    console.log('Sending message:', newMessage);
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/room/rooms/${slug}/messages/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // const protocol = backendUrl.startsWith('https') ? 'wss' : 'ws';
    // const wsUrl = `${protocol}://${backendUrl}/ws/room/${slug}/`;
    // const ws = new WebSocket(wsUrl);

    // ws.onopen = () => {
    //   console.log('WebSocket connected');
    //   setIsLoading(false);
    // };

    // ws.onmessage = (e) => {
    //   const data = JSON.parse(e.data);
    //   setMessages((prevMessages) => [...prevMessages, data]);
    // };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };

    // ws.onclose = () => {
    //   console.log('WebSocket closed');
    // };

    // // Set the WebSocket connection in state
    // setSocket(ws);

    // return () => {
    //   // Close the WebSocket connection when the component unmounts
    //   if (socket) {
    //     socket.close();
    //   }
    // };
    
  }, [backendUrl, slug, socket]);

  return (
    <div className="flex-1 overflow-auto bg-purple-100">
      <div className="py-2 px-3">
        {/* Dynamic Message Rendering */}
        {isLoading ? (
          <div>Loading messages...</div>
        ) : (
          messages.map((message, index) => {
            const isCurrentUserMessage = message.user === userData.id;
            return (
              <div key={index} className={`flex ${isCurrentUserMessage ? 'justify-end' : ''} mb-2 items-end`}>
                {!isCurrentUserMessage && (
                  // User ID button for messages from other users
                  <div className="rounded-full bg-blue-500 text-white text-xs mr-2 px-3 py-1">
                    {message.user}
                  </div>
                )}
                <div className={`rounded py-2 px-3 ${isCurrentUserMessage ? 'bg-green-300' : 'bg-slate-300'}`}>
                  <p className="text-sm mt-1">{message.content}</p>
                  <p className="text-right text-xs text-grey-dark mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
                {isCurrentUserMessage && (
                  // User ID button for current user's messages
                  <div className="rounded-full bg-red-500 text-white text-xs ml-2 px-3 py-1">
                    {message.user}
                  </div>
                )}
              </div>
            );
          })
        )}

    <div className="mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="px-3 py-2 border rounded-lg w-full"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-3 py-2 rounded-lg mt-2">
            Send
          </button>
        </div>
      </div>
    </div>
      
  );
};

export default MessageArea;