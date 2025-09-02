import React, { useState } from 'react';
import Chat from './components/Chat';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const joinChat = () => {
    if (!username.trim()) return;
    setIsJoined(true);
  };

  const leaveChat = () => {
    setIsJoined(false);
    setUsername('');
  };

  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>💬 Chat App</h1>
            <p>Connect with others in real-time</p>
          </div>
          
          <div className="login-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && joinChat()}
                maxLength={20}
                autoFocus
              />
            </div>
            
            <button 
              onClick={joinChat} 
              disabled={!username.trim()}
              className="join-button"
            >
              Join Chat
            </button>
          </div>
          
          <div className="login-footer">
            <p>Real-time messaging • No registration required</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Chat username={username} onLeave={leaveChat} />
    </div>
  );
}

export default App;