import React from 'react';

const UserList = ({ users, currentUser }) => {
  const getAvatarColor = (username) => {
    const colors = ['#f04747', '#faa61a', '#43b581', '#593695', '#f47fff', '#00d4aa'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="users-section">
      <h4>Online — {users.length}</h4>
      <div className="users-list">
        {users.map((user, index) => (
          <div key={index} className={`user-item ${user === currentUser ? 'current-user' : ''}`}>
            <div 
              className="user-avatar"
              style={{ backgroundColor: getAvatarColor(user) }}
            >
              {user.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user}</span>
            {user === currentUser && <span className="user-indicator">(you)</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;