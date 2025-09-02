# Real-Time Chat Application

A modern, full-stack chat application built with React and Node.js, featuring real-time messaging with Socket.IO and a Discord-inspired dark theme.

## 🚀 Features

- **Real-time messaging** with Socket.IO
- **Modern React frontend** with modular components
- **Node.js/Express backend** with RESTful API
- **Discord-inspired dark theme** with responsive design
- **User authentication** (username-based)
- **Online users list** with real-time updates
- **Message history** persistence
- **Typing indicators** for enhanced UX
- **Connection status** indicators
- **Message timestamps** and user avatars
- **Mobile-responsive design**
- **PWA support** with manifest

## 🛠️ Tech Stack

### Frontend
- **React 18+** with modern hooks and functional components
- **Socket.IO Client** for real-time communication
- **CSS3** with CSS variables and modern styling
- **Progressive Web App** features

### Backend
- **Node.js** with Express framework
- **Socket.IO** for WebSocket communication
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**
- **Rate limiting** and basic security measures

## 📦 Project Structure

```
├── frontend/                 # React application
│   ├── public/
│   │   ├── index.html        # HTML template with PWA meta tags
│   │   └── manifest.json     # PWA manifest file
│   ├── src/
│   │   ├── components/       # Modular React components
│   │   │   ├── Chat.js       # Main chat interface
│   │   │   ├── MessageList.js # Message display component
│   │   │   ├── MessageInput.js # Message input component
│   │   │   └── UserList.js   # Online users component
│   │   ├── styles/           # CSS styling
│   │   │   ├── App.css       # Main application styles
│   │   │   ├── Chat.css      # Chat-specific styles
│   │   │   └── index.css     # Global styles
│   │   ├── App.js            # Main App component
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── backend/                  # Node.js server
│   ├── routes/
│   │   └── messages.js       # Message API routes
│   ├── models/
│   │   └── Message.js        # Message data model
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── utils/
│   │   └── socketHandlers.js # Socket.IO event handlers
│   ├── server.js             # Main server file
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   └── README.md             # Backend documentation
├── package.json              # Root package.json with scripts
├── .gitignore                # Git ignore patterns
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+** and npm
- Modern web browser with WebSocket support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aysse/chat-app-test-ai.git
   cd chat-app-test-ai
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   # Start both frontend and backend concurrently
   npm start
   
   # Or start them separately:
   npm run start:backend  # Backend on http://localhost:8080
   npm run start:frontend # Frontend on http://localhost:3000
   ```

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## 🎮 Usage

1. **Start the application** using the commands above
2. **Open your browser** to `http://localhost:3000`
3. **Enter a username** to join the chat
4. **Start chatting** in real-time!
5. **Open multiple tabs** to simulate different users

## 🎨 UI Features

### Login Screen
- Modern, centered login form
- Username validation
- Responsive design
- Loading states

### Chat Interface
- **Sidebar** with online users list
- **Main chat area** with message history
- **Message input** with typing indicators
- **Real-time updates** for user join/leave
- **Connection status** indicator
- **Responsive design** for mobile devices

### Message Features
- **User avatars** with color coding
- **Timestamps** for all messages
- **System messages** for user events
- **Typing indicators** with animated dots
- **Message formatting** (bold, italic)
- **Auto-scroll** to latest messages

## 📡 WebSocket Protocol

### Client Events
- `user_join` - Join chat with username
- `send_message` - Send a new message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator

### Server Events
- `message_history` - Initial message history
- `users_list` - Current online users
- `user_joined` - User joined notification
- `user_left` - User left notification  
- `new_message` - New message broadcast
- `user_typing` - Typing indicator updates
- `error` - Error messages

### Message Format
```json
{
  "id": "unique-id",
  "type": "message",
  "user": "username",
  "content": "Hello world!",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

## 🔧 Configuration

### Environment Variables

Backend (`.env`):
```env
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Available Scripts

- `npm start` - Start both frontend and backend
- `npm run dev` - Development mode with auto-restart
- `npm run build` - Build frontend for production
- `npm test` - Run frontend tests
- `npm run lint` - Lint frontend code
- `npm run clean` - Clean all dependencies and builds

## 🚀 Production Deployment

### Frontend
```bash
cd frontend
npm run build
# Serve the build/ directory with any static file server
```

### Backend
```bash
cd backend
npm start
# Or use PM2, Docker, or any Node.js hosting service
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure proper CORS origins
- Set up reverse proxy (nginx) if needed
- Use process manager (PM2) for backend

## 🔒 Security Features

- **CORS protection** with configurable origins
- **Rate limiting** (60 requests per minute per IP)
- **Input validation** and sanitization
- **Message length limits** (500 characters)
- **Username uniqueness** validation
- **XSS protection** with content escaping

## 🎯 Browser Support

- **Chrome** 88+ (recommended)
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure both frontend and backend are running
3. Verify WebSocket connectivity
4. Check firewall settings for port 8080

---

Built with ❤️ using React, Node.js, and Socket.IO