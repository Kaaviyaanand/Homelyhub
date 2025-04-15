const dataset = require("../models/conversationData");

function getBotReply(message) {
  const matched = dataset.find(
    pair => pair.user.toLowerCase() === message.toLowerCase()
  );
  return matched ? matched.bot : "I'm sorry, I didn't understand that.";
}

module.exports = getBotReply;
