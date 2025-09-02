import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import '../styles/Chat.css';

const Chat = ({ username, onLeave }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:8080', {
      transports: ['websocket'],
      timeout: 5000
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setSocket(newSocket);
      
      // Join chat with username
      newSocket.emit('user_join', { username });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Message events
    newSocket.on('message_history', (messageHistory) => {
      setMessages(messageHistory);
    });

    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // User events
    newSocket.on('users_list', (usersList) => {
      setUsers(usersList);
    });

    newSocket.on('user_joined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        content: data.message,
        timestamp: data.timestamp
      }]);
    });

    newSocket.on('user_left', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        content: data.message,
        timestamp: data.timestamp
      }]);
    });

    // Typing events
    newSocket.on('user_typing', (data) => {
      if (data.typing) {
        setTypingUsers(prev => [...prev.filter(u => u !== data.user), data.user]);
      } else {
        setTypingUsers(prev => prev.filter(u => u !== data.user));
      }
    });

    // Error handling
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message || 'An error occurred');
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [username]);

  const sendMessage = (content) => {
    if (socket && content.trim()) {
      socket.emit('send_message', { content: content.trim() });
    }
  };

  const handleTypingStart = () => {
    if (socket && !isTyping) {
      setIsTyping(true);
      socket.emit('typing_start');
    }
  };

  const handleTypingStop = () => {
    if (socket && isTyping) {
      setIsTyping(false);
      socket.emit('typing_stop');
    }
  };

  const handleLeave = () => {
    if (socket) {
      socket.disconnect();
    }
    onLeave();
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <h3>General Chat</h3>
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        
        <UserList 
          users={users} 
          currentUser={username}
          onLeave={handleLeave}
        />
      </div>

      <div className="chat-main">
        <div className="chat-messages">
          <MessageList 
            messages={messages} 
            currentUser={username}
            typingUsers={typingUsers}
          />
        </div>
        
        <MessageInput 
          onSendMessage={sendMessage}
          onTypingStart={handleTypingStart}
          onTypingStop={handleTypingStop}
          disabled={!isConnected}
          placeholder={isConnected ? "Message #general" : "Connecting..."}
        />
      </div>
    </div>
  );
};

export default Chat;