# Chat Application Backend

This is the backend server for the chat application, built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging using Socket.IO
- RESTful API endpoints for message management
- User presence tracking
- Message history storage
- CORS support for frontend integration

## Prerequisites

- Node.js 16+ and npm
- Git

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:8080` by default.

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/paginated?page=1&limit=20` - Get paginated messages
- `POST /api/messages` - Create a new message (alternative to Socket.IO)
- `DELETE /api/messages/:id` - Delete a message

## Socket.IO Events

### Client to Server
- `join_chat` - Join the chat room
- `send_message` - Send a new message
- `typing` - Indicate user is typing
- `stop_typing` - Indicate user stopped typing

### Server to Client
- `user_joined` - New user joined the chat
- `user_left` - User left the chat
- `users_list` - Current list of online users
- `new_message` - New message received
- `message_history` - Message history for new users
- `user_typing` - User is typing
- `user_stop_typing` - User stopped typing

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| NODE_ENV | Environment | development |
| CLIENT_URL | Frontend URL for CORS | http://localhost:3000 |

## Project Structure

```
backend/
├── models/
│   └── Message.js          # Message data model
├── routes/
│   └── messages.js         # Message API routes
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
└── README.md              # This file
```

## Testing

You can test the Socket.IO connection using a Socket.IO client or by running the frontend application.

For API testing, you can use curl:

```bash
# Health check
curl http://localhost:8080/health

# Get messages
curl http://localhost:8080/api/messages

# Create a message
curl -X POST http://localhost:8080/api/messages \
  -H "Content-Type: application/json" \
  -d '{"user":"TestUser","content":"Hello World!"}'
```

## Production Deployment

1. Set NODE_ENV to production
2. Configure appropriate PORT and CLIENT_URL
3. Consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "chat-backend"
   ```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed