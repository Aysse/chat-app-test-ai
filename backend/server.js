const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Store connected users
const connectedUsers = new Map();
const messageHistory = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle user joining
  socket.on('join_chat', (userData) => {
    const { username } = userData;
    
    // Store user information
    connectedUsers.set(socket.id, {
      id: socket.id,
      username: username,
      joinedAt: new Date()
    });

    // Notify all clients about new user
    socket.broadcast.emit('user_joined', {
      user: username,
      timestamp: new Date().toISOString()
    });

    // Send current users list to the new user
    const usersList = Array.from(connectedUsers.values()).map(user => user.username);
    socket.emit('users_list', { users: usersList });

    // Send message history to new user
    socket.emit('message_history', messageHistory);

    console.log(`User ${username} joined the chat`);
  });

  // Handle new messages
  socket.on('send_message', (messageData) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const message = {
      id: Date.now(),
      user: user.username,
      content: messageData.content,
      timestamp: new Date().toISOString()
    };

    // Store message in history
    messageHistory.push(message);

    // Keep only last 100 messages in memory
    if (messageHistory.length > 100) {
      messageHistory.shift();
    }

    // Broadcast message to all clients
    io.emit('new_message', message);

    console.log(`Message from ${user.username}: ${messageData.content}`);
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    socket.broadcast.emit('user_typing', {
      user: user.username
    });
  });

  socket.on('stop_typing', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    socket.broadcast.emit('user_stop_typing', {
      user: user.username
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    
    if (user) {
      // Remove user from connected users
      connectedUsers.delete(socket.id);

      // Notify all clients about user leaving
      socket.broadcast.emit('user_left', {
        user: user.username,
        timestamp: new Date().toISOString()
      });

      // Send updated users list to all clients
      const usersList = Array.from(connectedUsers.values()).map(user => user.username);
      io.emit('users_list', { users: usersList });

      console.log(`User ${user.username} disconnected`);
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    connectedUsers: connectedUsers.size 
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});