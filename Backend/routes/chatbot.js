const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');
const  getBotReply  = require('../controllers/conversationController').getBotReply;

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    let conversation = await Conversation.findOne().sort({ createdAt: -1 });
    if (!conversation) {
      conversation = new Conversation({ messages: [] });
    }

    conversation.messages.push({ text: message, sender: 'user' });

    const botReply = getBotReply(message);
    conversation.messages.push({ text: botReply, sender: 'bot' });

    await conversation.save();

    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error('Error saving conversation:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/chat', async (req, res) => {
  try {
    const conversation = await Conversation.findOne().sort({ createdAt: -1 });
    res.status(200).json(conversation ? conversation.messages : []);
  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
