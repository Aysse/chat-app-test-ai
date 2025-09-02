import React, { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = ({ messages, onSendMessage, isConnected, username }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="main-content">
      <div className="chat-header">
        <h2># general</h2>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="chat-messages">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput 
        onSendMessage={onSendMessage} 
        isConnected={isConnected}
      />
    </div>
  );
};

export default Chat;