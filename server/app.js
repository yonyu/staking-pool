const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("nexpi-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.set('trust proxy', 1); // Trust first proxy (important for secure cookies)
app.use(session({
  secret: 'ether',  // Use a secure key or environment variable
  resave: false,              // Prevent resaving unchanged sessions
  saveUninitialized: true,    // Save new sessions even if not modified
  cookie: { secure: true }    // Secure cookies in production
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

module.exports = app;
