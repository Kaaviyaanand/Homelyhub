const dataset = [
  { user: "Hello", bot: "Hello! Welcome to HomlyHub. How can I assist you today?" },
  { user: "I want to book a room", bot: "I can help you with booking. What type of accommodation are you looking for?" },
  { user: "Can you give me some health tips?", bot: "For a great stay, remember to check the amenities and read reviews!" },
  { user: "Hi", bot: "Hi there! How can I help you at HomlyHub?" },
  { user: "Tell me about the villas available", bot: "We offer a variety of villas. What location or dates are you interested in?" },
  { user: "I need a place for next weekend", bot: "Sure! Let me check the availability for next weekend." },
  { user: "Thank you!", bot: "You're welcome! Let me know if you need anything else." }
];

exports.getBotReply = (message) => {
  const matched = dataset.find(
    pair => pair.user.toLowerCase() === message.toLowerCase()
  );
  return matched ? matched.bot : "I'm sorry, I didn't understand that.";
};
