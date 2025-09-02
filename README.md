# Chat Application

A real-time chat application with React frontend and Node.js backend, featuring a Discord-inspired interface.

## 🚀 Features

- **Real-time messaging** using Socket.IO
- **User authentication** (basic username-based)
- **Message history** with in-memory storage
- **Online user list** showing currently connected users
- **Responsive design** for desktop and mobile
- **Discord-style UI** with dark theme
- **Clean, modern interface** with hover effects and smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18+ with modern hooks and Socket.IO client
- **Backend**: Node.js with Express and Socket.IO
- **Communication**: Real-time WebSocket with Socket.IO
- **Styling**: Pure CSS with Discord color scheme

## 📦 Project Structure

```
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.js        # Main chat interface
│   │   │   ├── MessageList.js # Message display component
│   │   │   ├── MessageInput.js# Message input component
│   │   │   └── UserList.js    # Online users component
│   │   ├── styles/
│   │   │   └── App.css        # Application styling
│   │   ├── App.js             # Main application component
│   │   └── index.js           # React entry point
│   └── package.json           # Frontend dependencies
├── backend/                    # Node.js server
│   ├── models/
│   │   └── Message.js         # Message data model
│   ├── routes/
│   │   └── messages.js        # API routes for messages
│   ├── server.js              # Express server with Socket.IO
│   ├── .env                   # Environment variables
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend documentation
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aysse/chat-app-test-ai.git
   cd chat-app-test-ai
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server will start on `http://localhost:8080`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   App will open on `http://localhost:3000`

## 🎮 Usage

1. Start the Node.js backend server first
2. Launch the React frontend application
3. Enter a username to join the chat
4. Open multiple browser tabs or devices to simulate different users
5. Start chatting in real-time!

## 🎨 Discord Theme Colors

- **Background**: `#36393f`, `#2f3136`
- **Text**: `#dcddde`, `#ffffff`
- **Accent**: `#7289da` (Discord blue)
- **Online**: `#43b581` (green)
- **Offline**: `#f04747` (red)

## 📡 Socket.IO Events

### Client to Server
- `join_chat` - Join the chat room with username
- `send_message` - Send a new message
- `typing` - Indicate user is typing (future feature)
- `stop_typing` - Indicate user stopped typing (future feature)

### Server to Client
- `user_joined` - New user joined notification
- `user_left` - User left notification
- `users_list` - Current list of online users
- `new_message` - New message received
- `message_history` - Message history for new users

## 🔧 API Endpoints

The backend also provides REST API endpoints:

- `GET /health` - Server health check
- `GET /api/messages` - Get all messages
- `GET /api/messages/paginated` - Get paginated messages
- `POST /api/messages` - Create a message (alternative to Socket.IO)
- `DELETE /api/messages/:id` - Delete a message

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:8080` by default. For production, update the Socket.IO connection URL in `App.js`.

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Configure appropriate `PORT` and `CLIENT_URL`
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "chat-backend"
   ```

### Frontend
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the static files using a web server (nginx, Apache, etc.)
3. Update the Socket.IO connection URL for your production backend

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Health check
curl http://localhost:8080/health

# API endpoints
curl http://localhost:8080/api/messages
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔄 Features in Development

- [ ] User typing indicators
- [ ] Message reactions/emojis
- [ ] File/image sharing
- [ ] Private messaging
- [ ] User roles and permissions
- [ ] Message persistence with database
- [ ] Message search functionality

## 📱 Mobile Support

The application is responsive and works well on mobile devices with touch-friendly interfaces and optimized layouts.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React and Node.js