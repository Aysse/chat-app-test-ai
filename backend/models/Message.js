// In-memory message storage (in production, you'd use a database)
let messages = [];
let messageIdCounter = 1;

class Message {
  constructor(id, user, content, timestamp = new Date()) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.timestamp = timestamp;
    this.type = 'message'; // 'message' or 'system'
  }

  // Static methods for message operations
  static createMessage(user, content, type = 'message') {
    const message = new Message(
      messageIdCounter++,
      user,
      content,
      new Date().toISOString()
    );
    message.type = type;
    
    messages.push(message);
    
    // Keep only last 1000 messages in memory
    if (messages.length > 1000) {
      messages = messages.slice(-1000);
    }
    
    return message;
  }

  static getAllMessages() {
    return [...messages]; // Return a copy to prevent external modification
  }

  static getMessageById(id) {
    return messages.find(message => message.id === id);
  }

  static getMessagesPaginated(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return messages.slice(startIndex, endIndex);
  }

  static getRecentMessages(count = 50) {
    return messages.slice(-count);
  }

  static deleteMessage(id) {
    const index = messages.findIndex(message => message.id === id);
    if (index !== -1) {
      messages.splice(index, 1);
      return true;
    }
    return false;
  }

  static getMessagesByUser(username) {
    return messages.filter(message => message.user === username);
  }

  static searchMessages(query) {
    const lowerQuery = query.toLowerCase();
    return messages.filter(message => 
      message.content.toLowerCase().includes(lowerQuery) ||
      message.user.toLowerCase().includes(lowerQuery)
    );
  }

  static getTotalMessages() {
    return messages.length;
  }

  static clearAllMessages() {
    messages = [];
    messageIdCounter = 1;
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      user: this.user,
      content: this.content,
      timestamp: this.timestamp,
      type: this.type
    };
  }

  static createSystemMessage(content) {
    return Message.createMessage('System', content, 'system');
  }
}

module.exports = Message;