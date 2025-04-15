// app.js
const express = require("express");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const chatRoutes = require("./routes/chatbot"); // Chatbot routes
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/v1/rent/listing", propertyRoutes); // Property routes
app.use("/api/v1/rent/user", userRoutes); // User routes
app.use("/api/v1/rent/chat", chatRoutes); // Chatbot route

module.exports = app;
