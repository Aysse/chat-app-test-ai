const Message = require('../models/Message');

// Store active users and their socket IDs
const activeUsers = new Map();
const messages = [];

const socketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔗 New connection: ${socket.id}`);

    // Handle user joining
    socket.on('user_join', (data) => {
      const { username } = data;
      
      if (!username || username.trim().length === 0) {
        socket.emit('error', { message: 'Username is required' });
        return;
      }

      // Check if username is already taken
      const userExists = Array.from(activeUsers.values()).includes(username);
      if (userExists) {
        socket.emit('error', { message: 'Username already taken' });
        return;
      }

      // Add user to active users
      activeUsers.set(socket.id, username);
      socket.username = username;

      // Join a room (for future room functionality)
      socket.join('general');

      // Send current messages to the new user
      socket.emit('message_history', messages);

      // Send current users list to the new user
      socket.emit('users_list', Array.from(activeUsers.values()));

      // Create and broadcast join message
      const joinMessage = Message.createUserJoinedMessage(username);
      messages.push(joinMessage);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.splice(0, messages.length - 100);
      }

      // Broadcast to all users
      io.emit('user_joined', {
        type: 'user_joined',
        user: username,
        message: joinMessage.content,
        timestamp: joinMessage.timestamp
      });

      // Broadcast updated users list
      io.emit('users_list', Array.from(activeUsers.values()));

      console.log(`👤 User joined: ${username}`);
    });

    // Handle new messages
    socket.on('send_message', (data) => {
      const { content } = data;
      const username = socket.username;

      if (!username) {
        socket.emit('error', { message: 'User not authenticated' });
        return;
      }

      if (!Message.isValid(username, content)) {
        socket.emit('error', { message: 'Invalid message content' });
        return;
      }

      // Create new message
      const message = new Message(username, content.trim());
      messages.push(message);

      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.splice(0, messages.length - 100);
      }

      // Broadcast message to all users
      io.emit('new_message', {
        type: 'message',
        id: message.id,
        user: message.user,
        content: message.content,
        timestamp: message.timestamp
      });

      console.log(`💬 Message from ${username}: ${content}`);
    });

    // Handle typing indicators
    socket.on('typing_start', () => {
      const username = socket.username;
      if (username) {
        socket.broadcast.emit('user_typing', { user: username, typing: true });
      }
    });

    socket.on('typing_stop', () => {
      const username = socket.username;
      if (username) {
        socket.broadcast.emit('user_typing', { user: username, typing: false });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const username = activeUsers.get(socket.id);
      
      if (username) {
        // Remove user from active users
        activeUsers.delete(socket.id);

        // Create and broadcast leave message
        const leaveMessage = Message.createUserLeftMessage(username);
        messages.push(leaveMessage);

        // Keep only last 100 messages
        if (messages.length > 100) {
          messages.splice(0, messages.length - 100);
        }

        // Broadcast to remaining users
        socket.broadcast.emit('user_left', {
          type: 'user_left',
          user: username,
          message: leaveMessage.content,
          timestamp: leaveMessage.timestamp
        });

        // Broadcast updated users list
        io.emit('users_list', Array.from(activeUsers.values()));

        console.log(`👋 User left: ${username}`);
      }

      console.log(`❌ Connection closed: ${socket.id}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`❗ Socket error for ${socket.id}:`, error);
    });
  });
};

module.exports = socketHandlers;