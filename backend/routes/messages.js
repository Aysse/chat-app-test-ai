const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// In-memory storage for messages (in production, use a database)
let messages = [];

// Get all messages
router.get('/', (req, res) => {
  try {
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create a new message
router.post('/', (req, res) => {
  try {
    const { user, content } = req.body;
    
    if (!user || !content) {
      return res.status(400).json({ error: 'User and content are required' });
    }

    const message = new Message(user, content);
    messages.push(message);

    // Keep only last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Delete all messages (for testing)
router.delete('/', (req, res) => {
  try {
    messages = [];
    res.json({ message: 'All messages deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete messages' });
  }
});

module.exports = router;