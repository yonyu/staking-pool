// Import required modules
const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// Set server port, use environment variable if available or default to 4000
const PORT = process.env.PORT || 4000;

// Handle uncaught exceptions globally
// This prevents the app from crashing silently and logs the error
// UncaughtException Error Handler (should be at the top)
process.on("uncaughtException", (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  console.log("🛑 Shutting down server due to uncaught exception");
  process.exit(1);
});

// Database connection is currently commented out
connectDatabase();

// Configure Cloudinary credentials for file upload functionality
// These values should be set in environment variables for security
// Configure Cloudinary
if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("☁️  Cloudinary configured successfully");
} else {
  console.warn("⚠️  Cloudinary configuration missing - file uploads may not work");
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`🌟 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`❌ Unhandled Promise Rejection: ${err.message}`);
  console.log("🛑 Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});
