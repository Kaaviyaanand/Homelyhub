import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const smartSuggestions = [
    "Show villas in Delhi",
    "Find properties with pool",
    "Book a room",
    "List amenities",
    "Properties under ₹2000"
  ];

  const toggleChat = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMsg = { text, sender: 'user', timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/rent/chat', {
        message: text
      });

      const replyMsg = res.data.reply || "No response from bot";
      const botMsg = { text: replyMsg, sender: 'bot', timestamp: new Date().toISOString() };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [
        ...prev,
        { text: '⚠️ Bot failed to respond. Please try again.', sender: 'bot', timestamp: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/rent/chat');
      setMessages(res.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot">
      <button className="chat-button" onClick={toggleChat}>💬</button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">HomlyBot</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
                data-time={new Date(msg.timestamp).toLocaleTimeString()}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-message bot typing">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-options">
            {smartSuggestions.map((suggestion, index) => (
              <button key={index} onClick={() => handleSendMessage(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={() => handleSendMessage()} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
