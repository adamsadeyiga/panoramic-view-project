const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const propertiesRoutes = require("./routes/propertiesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/panoramic-view-project-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/api", propertiesRoutes);
app.use("/api", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
