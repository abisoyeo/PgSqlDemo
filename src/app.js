const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./auth/auth.routes");
const courseRoutes = require("./course/course.routes");

// Import middleware
const errorHandler = require("./shared/errorHandler");

// Import associations to ensure they're loaded
require("./shared/associations");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "EduMini API is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
