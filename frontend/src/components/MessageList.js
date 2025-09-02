import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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

  const formatMessageContent = (content) => {
    // Basic text formatting (you can extend this)
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <h3>Welcome to #general</h3>
          <p>This is the beginning of the general channel.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.type === 'system' ? 'system-message' : ''} ${message.user === currentUser ? 'own-message' : ''}`}
          >
            {message.type === 'system' ? (
              <div className="system-content">
                <span className="system-text">{message.content}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            ) : (
              <div className="message-content">
                <div 
                  className="message-avatar"
                  style={{ backgroundColor: getAvatarColor(message.user) }}
                >
                  {message.user.charAt(0).toUpperCase()}
                </div>
                <div className="message-body">
                  <div className="message-header">
                    <span className="message-author">{message.user}</span>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                  <div 
                    className="message-text"
                    dangerouslySetInnerHTML={{ 
                      __html: formatMessageContent(message.content) 
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )}
      
      {/* Typing indicators */}
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <div className="typing-content">
            <div className="typing-avatar">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="typing-text">
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...`
                : typingUsers.length === 2
                ? `${typingUsers[0]} and ${typingUsers[1]} are typing...`
                : `${typingUsers.length} people are typing...`
              }
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;