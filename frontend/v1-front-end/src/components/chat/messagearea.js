import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MessageArea = ({ backendUrl, userData }) => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages();  // Fetch initial messages

    // Initialize WebSocket connection if not already connected
    if (!socket) {
      const protocol = backendUrl.startsWith('https') ? 'wss' : 'ws';
      const wsUrl = `${protocol}://${"localhost:8080"}/ws/room/${slug}/`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsLoading(false);
      };

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsLoading(false);
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        setIsLoading(false);
        setSocket(null);
      };

      setSocket(ws);
    }

    return () => {
      if (socket) {
        socket.close();
        console.log('WebSocket connection closed');
      }
    };
  }, [backendUrl, slug]); // Dependencies for useEffect

  const fetchMessages = async () => {
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

  const sendMessage = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({room: slug, user: userData.id, content: newMessage  }));
      setNewMessage('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ height: '400px', overflowY: 'scroll', padding: '10px', backgroundColor: '#E5DDD5', border: '1px solid #ddd' }}>
        {isLoading ? <div>Loading messages...</div> : messages.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.user === userData.id ? 'right' : 'left',
            marginBottom: '10px'
          }}>
            <div style={{
              display: 'inline-block',
              maxWidth: '80%',
              backgroundColor: msg.user === userData.id ? '#DCF8C6' : 'white',
              padding: '8px 10px',
              borderRadius: '10px',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{msg.user}</p>
              <p style={{ margin: 0 }}>{msg.content}</p> {/* Displaying the message content */}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '20px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ backgroundColor: '#075E54', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '20px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
