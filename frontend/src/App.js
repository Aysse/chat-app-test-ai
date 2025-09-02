import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'message') {
        setMessages(prev => [...prev, {
          id: Date.now(),
          user: data.user,
          content: data.content,
          timestamp: data.timestamp
        }]);
      } else if (data.type === 'user_joined') {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'system',
          content: `${data.user} joined the chat`,
          timestamp: data.timestamp
        }]);
        setUsers(prev => [...prev, data.user]);
      } else if (data.type === 'user_left') {
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'system',
          content: `${data.user} left the chat`,
          timestamp: data.timestamp
        }]);
        setUsers(prev => prev.filter(user => user !== data.user));
      } else if (data.type === 'users_list') {
        setUsers(data.users);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const joinChat = () => {
    if (!username.trim()) return;
    
    connectWebSocket();
    setIsJoined(true);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;

    const message = {
      type: 'message',
      user: username,
      content: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    socket.send(JSON.stringify(message));
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAvatarColor = (username) => {
    const colors = ['#f04747', '#faa61a', '#43b581', '#593695', '#f47fff', '#00d4aa'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
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
            onKeyPress={(e) => e.key === 'Enter' && joinChat()}
            maxLength={20}
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
        <div className="users-section">
          <h4>Online — {users.length}</h4>
          <div className="users-list">
            {users.map((user, index) => (
              <div key={index} className="user-item">
                <div 
                  className="user-avatar"
                  style={{ backgroundColor: getAvatarColor(user) }}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="chat-header">
          <h2># general</h2>
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type === 'system' ? 'system-message' : ''}`}> 
              {message.type !== 'system' ? (
                <> 
                  <div 
                    className="message-avatar"
                    style={{ backgroundColor: getAvatarColor(message.user) }}
                  >
                    {message.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-author">{message.user}</span>
                      <span className="message-timestamp">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="message-text">{message.content}</div>
                  </div>
                </>
              ) : (
                <div className="system-message-content">
                  {message.content}
                  <span className="message-timestamp">{formatTime(message.timestamp)}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-container">
          <div className="message-input-wrapper">
            <input
              type="text"
              placeholder="Message #general"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
            />
            <button 
              onClick={sendMessage} 
              disabled={!newMessage.trim() || !isConnected}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;