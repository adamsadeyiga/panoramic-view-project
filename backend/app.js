const express = require("express");
const mongoose = require("mongoose");
const panoramicRoutes = require("./routes/panoramicRoutes");

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

// Routes
app.use("/api", panoramicRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
