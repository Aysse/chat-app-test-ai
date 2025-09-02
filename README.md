# Discord-Style Chat Application

A real-time chat application with React frontend and Rust backend, featuring Discord-inspired styling.

## 🚀 Features

- **Real-time messaging** with WebSocket connection
- **Discord-inspired dark theme** with authentic colors
- **User list** showing online users
- **Responsive design** for desktop and mobile
- **Join/leave notifications**
- **Message timestamps** and user avatars

## 🛠️ Tech Stack

- **Frontend**: React 18+ with modern hooks
- **Backend**: Rust with tokio + warp
- **Communication**: WebSocket with JSON protocol
- **Styling**: Pure CSS with Discord color scheme

## 📦 Project Structure

```
├── frontend/           # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── backend/            # Rust WebSocket server
│   ├── src/
│   │   └── main.rs
│   └── Cargo.toml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Rust 1.70+ and Cargo

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aysse/chat-app-test-ai.git
   cd chat-app-test-ai
   ```

2. **Setup Backend (Rust)**
   ```bash
   cd backend
   cargo build
   cargo run
   ```
   Server will start on `ws://localhost:8080`

3. **Setup Frontend (React)**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   App will open on `http://localhost:3000`

## 🎮 Usage

1. Start the Rust backend server first
2. Launch the React frontend
3. Open multiple browser tabs to simulate different users
4. Start chatting in real-time!

## 🎨 Discord Theme Colors

- Background: `#36393f`, `#2f3136`
- Text: `#dcddde`, `#ffffff`
- Accent: `#5865f2` (Discord blue)
- Online: `#43b581` (green)

## 📡 WebSocket Protocol

Messages use JSON format:
```json
{
  "type": "message",
  "user": "username",
  "content": "Hello world!",
  "timestamp": "2025-09-02T15:57:41Z"
}
```

## 🚀 Production Deployment

- Backend: Deploy Rust binary to any cloud provider
- Frontend: Build with `npm run build` and serve static files
- Environment: Configure WebSocket URL for production

---

Built with ❤️ using React and Rust