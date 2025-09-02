import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isConnected }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-wrapper">
        <input
          type="text"
          placeholder={isConnected ? "Message #general" : "Connecting..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!isConnected}
          className="message-input"
        />
        <button 
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;