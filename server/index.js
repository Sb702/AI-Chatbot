const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const routes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

dotenv.config();

// Connect to MongoDB and log when connected
mongoose.connect(
  `mongodb+srv://bisignanosam:Tree123.@chatcluster0.nb9enyn.mongodb.net/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Endpoint to interact with ChatGPT
app.post("/chat", routes.Chat);

// Endpoint for Users
app.post("/register", userRoutes.register);
app.post("/login", userRoutes.login);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
