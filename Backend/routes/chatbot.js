const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');
const detectIntent = require('../utils/intentEngine');
const queryHandlers = require('../utils/queryHandler'); // 👈 multiple intent handlers

// POST: Smart chatbot message handler
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    let conversation = await Conversation.findOne().sort({ createdAt: -1 });
    if (!conversation) conversation = new Conversation({ messages: [] });

    conversation.messages.push({ text: message, sender: 'user' });

    // 🔍 Detect intent and find appropriate handler
    const intent = detectIntent(message);
    const handlerFn = queryHandlers[intent] || queryHandlers.fallback;

    const botReply = await handlerFn(message); // ⬅️ now calling the correct function

    conversation.messages.push({ text: botReply, sender: 'bot' });
    await conversation.save();

    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Fetch latest conversation
router.get('/chat', async (req, res) => {
  try {
    const conversation = await Conversation.findOne().sort({ createdAt: -1 });
    res.status(200).json(conversation ? conversation.messages : []);
  } catch (err) {
    console.error('Error fetching chat:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
