// seedConversations.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Conversation = require('./Models/conversation');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ MongoDB connected...');

  const conversationData = [
    {
      user: "Hello",
      bot: "Hello! Welcome to HomlyHub. How can I assist you today?"
    },
    {
      user: "I want to book a room",
      bot: "I can help you with booking. What type of accommodation are you looking for?"
    },
    {
      user: "Can you give me some health tips?",
      bot: "For a great stay, remember to check the amenities and read reviews!"
    },
    {
      user: "What are your services?",
      bot: "I'm sorry, I didn't understand that."
    },
    {
      user: "Hi",
      bot: "Hello! Welcome to HomlyHub. How can I assist you today?"
    },
    {
      user: "Tell me about the villas available",
      bot: "We have a variety of luxurious villas available. What dates are you looking to book?"
    },
    {
      user: "I need a place for next weekend",
      bot: "Great! Let me check the availability for next weekend."
    },
    {
      user: "Thank you!",
      bot: "You're welcome! If you have any more questions, feel free to ask."
    }
  ];

  const formattedData = [];

  conversationData.forEach(pair => {
    formattedData.push({ message: pair.user, sender: 'user' });
    formattedData.push({ message: pair.bot, sender: 'bot' });
  });

  await Conversation.deleteMany(); // Clear old data (optional)
  await Conversation.insertMany(formattedData);

  console.log('✅ Conversation seeded!');
  process.exit();
}).catch(err => {
  console.error('❌ DB connection error:', err);
});
