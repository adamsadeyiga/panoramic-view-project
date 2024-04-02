const express = require("express");
const router = express.Router();

// Mock data for panoramic views (replace with actual data later)
const panoramicViews = [
  { id: 1, title: "Panoramic View 1", imageUrl: "panoramic1.jpg" },
  { id: 2, title: "Panoramic View 2", imageUrl: "panoramic2.jpg" },
  // Add more panoramic views here
];

// Route to fetch all panoramic views
router.get("/panoramic-views", (req, res) => {
  res.json(panoramicViews);
});

// Route to fetch a specific panoramic view by ID
router.get("/panoramic-views/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const panoramicView = panoramicViews.find((view) => view.id === id);
  if (panoramicView) {
    res.json(panoramicView);
  } else {
    res.status(404).json({ message: "Panoramic view not found" });
  }
});

module.exports = router;
