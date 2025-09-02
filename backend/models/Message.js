const { v4: uuidv4 } = require('uuid');

class Message {
  constructor(user, content, type = 'message') {
    this.id = uuidv4();
    this.user = user;
    this.content = content;
    this.type = type;
    this.timestamp = new Date().toISOString();
  }

  // Create a system message
  static createSystemMessage(content) {
    const message = new Message('System', content, 'system');
    return message;
  }

  // Create a user joined message
  static createUserJoinedMessage(username) {
    return Message.createSystemMessage(`${username} joined the chat`);
  }

  // Create a user left message
  static createUserLeftMessage(username) {
    return Message.createSystemMessage(`${username} left the chat`);
  }

  // Validate message content
  static isValid(user, content) {
    return user && user.trim().length > 0 && 
           content && content.trim().length > 0 && 
           content.length <= 500;
  }
}

module.exports = Message;