import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage, onTypingStart, onTypingStop, disabled, placeholder }) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicators
    if (value.trim() && !disabled) {
      onTypingStart();
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        onTypingStop();
      }, 1000);
    } else {
      onTypingStop();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const sendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      onTypingStop();
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Focus back to input
      inputRef.current?.focus();
    }
  };

  const handlePaste = (e) => {
    // Handle pasted content (you can add file upload logic here)
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData('text');
    
    if (pastedText.length > 500) {
      e.preventDefault();
      alert('Message is too long. Please keep it under 500 characters.');
    }
  };

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <div className="input-area">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={500}
            rows={1}
            className="message-input"
            autoFocus
          />
          
          <div className="input-actions">
            <button 
              onClick={sendMessage}
              disabled={!message.trim() || disabled}
              className="send-button"
              title="Send message (Enter)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="input-hint">
          {message.length > 450 && (
            <span className="character-count">
              {500 - message.length} characters remaining
            </span>
          )}
          <span className="input-help">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;