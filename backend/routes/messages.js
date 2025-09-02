const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', (req, res) => {
  try {
    const messages = Message.getAllMessages();
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Get messages with pagination
router.get('/paginated', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const messages = Message.getMessagesPaginated(page, limit);
    res.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total: Message.getTotalMessages()
      }
    });
  } catch (error) {
    console.error('Error fetching paginated messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Create a new message (alternative to Socket.IO)
router.post('/', (req, res) => {
  try {
    const { user, content } = req.body;
    
    if (!user || !content) {
      return res.status(400).json({
        success: false,
        error: 'User and content are required'
      });
    }

    const message = Message.createMessage(user, content);
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create message'
    });
  }
});

// Delete a message
router.delete('/:id', (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const deleted = Message.deleteMessage(messageId);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Message deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
});

module.exports = router;