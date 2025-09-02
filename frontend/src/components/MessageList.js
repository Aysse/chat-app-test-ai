import React from 'react';

const MessageList = ({ messages }) => {
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

  return (
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
    </div>
  );
};

export default MessageList;