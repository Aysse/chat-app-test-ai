import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import UserList from './components/UserList';
import './styles/App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const connectToServer = () => {
    const newSocket = io('http://localhost:8080');
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setSocket(newSocket);
      
      // Join the chat with username
      newSocket.emit('join_chat', { username });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('user_joined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        content: `${data.user} joined the chat`,
        timestamp: data.timestamp
      }]);
    });

    newSocket.on('user_left', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        content: `${data.user} left the chat`,
        timestamp: data.timestamp
      }]);
    });

    newSocket.on('users_list', (data) => {
      setUsers(data.users);
    });

    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, {
        id: message.id,
        user: message.user,
        content: message.content,
        timestamp: message.timestamp,
        type: 'message'
      }]);
    });

    newSocket.on('message_history', (history) => {
      setMessages(history.map(msg => ({
        ...msg,
        type: msg.type || 'message'
      })));
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });
  };

  const joinChat = () => {
    if (!username.trim()) return;
    
    connectToServer();
    setIsJoined(true);
  };

  const sendMessage = (content) => {
    if (!socket || !isConnected || !content.trim()) return;

    socket.emit('send_message', {
      content: content.trim()
    });
  };

  const handleUsernameKeyPress = (e) => {
    if (e.key === 'Enter') {
      joinChat();
    }
  };

  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Discord Chat</h1>
          <p>Enter your username to join the chat</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleUsernameKeyPress}
            maxLength={20}
            autoFocus
          />
          <button onClick={joinChat} disabled={!username.trim()}>
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="server-info">
          <h3>General Chat</h3>
        </div>
        <UserList users={users} currentUser={username} />
      </div>

      <Chat 
        messages={messages}
        onSendMessage={sendMessage}
        isConnected={isConnected}
        username={username}
      />
    </div>
  );
}

export default App;