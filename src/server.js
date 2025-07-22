require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./shared/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("👋 SIGTERM received, shutting down gracefully");
  await sequelize.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("👋 SIGINT received, shutting down gracefully");
  await sequelize.close();
  process.exit(0);
});

startServer();
