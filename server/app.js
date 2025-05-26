const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("nexpi-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}

app.set('trust proxy', 1); // Trust first proxy (important for secure cookies)
app.use(session({
  secret: 'ether',  // Use a secure key or environment variable
  resave: false,              // Prevent resaving unchanged sessions
  saveUninitialized: true,    // Save new sessions even if not modified
  cookie: { secure: true }    // Secure cookies in production
}));

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload());

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Deployment configuration
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "/build")));

  // Handle React routing
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "🚀 Munity Staking API Server is Running!",
      version: "v5.0.0",
      environment: process.env.NODE_ENV || 'development',
      endpoints: [
        "GET /health - Health check",
        "POST /api/v1/user/* - User endpoints",
        "GET /api/v1/product/* - Product endpoints",
        "POST /api/v1/order/* - Order endpoints",
        "POST /api/v1/payment/* - Payment endpoints"
      ]
    });
  });
}

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error Handler:', err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

module.exports = app;
