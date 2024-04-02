const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET all properties with panoramic view data
router.get("/properties", async (req, res) => {
  try {
    // Retrieve all properties from the database
    const properties = await Property.find();

    // Map properties to include only necessary data and panoramic view URLs
    const propertyListings = properties.map((property) => ({
      id: property._id,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      panoramicViewUrls: property.panoramicViewUrls,
    }));

    // Return property listings as JSON response
    res.json(propertyListings);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
