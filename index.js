const express = require("express");
const app = express();
const port = 3000;

// Import panoramic routes
const panoramicRoutes = require("./routes/panoramicRoutes");

// Use panoramic routes
app.use("/api", panoramicRoutes);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
