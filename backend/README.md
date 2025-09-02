# Chat Application Backend

This is the backend server for the real-time chat application built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging using Socket.IO
- User authentication and session management
- Message history storage
- Online users tracking
- Typing indicators
- Rate limiting and basic security measures

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (example provided as `.env`):
   ```env
   PORT=8080
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

3. Start the server:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### REST API

- `GET /api/health` - Health check endpoint
- `GET /api/messages` - Retrieve message history
- `POST /api/messages` - Create a new message
- `DELETE /api/messages` - Clear all messages (development only)

### Socket.IO Events

#### Client to Server:
- `user_join` - Join the chat with username
- `send_message` - Send a new message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator

#### Server to Client:
- `message_history` - Initial message history
- `users_list` - Current online users
- `user_joined` - User joined notification
- `user_left` - User left notification
- `new_message` - New message broadcast
- `user_typing` - Typing indicator updates
- `error` - Error messages

## Project Structure

```
backend/
├── server.js              # Main server file
├── routes/
│   └── messages.js         # Message API routes
├── models/
│   └── Message.js          # Message data model
├── middleware/
│   └── auth.js             # Authentication middleware
├── utils/
│   └── socketHandlers.js   # Socket.IO event handlers
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
└── README.md               # This file
```

## Environment Variables

- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment mode (development/production)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)
- `API_KEY` - API key for authentication (production only)

## Security Features

- CORS protection
- Rate limiting (60 requests per minute per IP)
- Input validation
- Message length limits
- Username uniqueness validation

## Development

For development with auto-restart:
```bash
npm run dev
```

## Production

For production deployment:
```bash
npm start
```

Make sure to set `NODE_ENV=production` and configure proper environment variables.