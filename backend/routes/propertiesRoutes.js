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

// POST create a new property
router.post("/properties", async (req, res) => {
  try {
    // Extract property data from request body
    const { title, description, price, location, panoramicViewUrls } = req.body;

    // Create a new property object
    const property = new Property({
      title,
      description,
      price,
      location,
      panoramicViewUrls,
    });

    // Save the new property to the database
    await property.save();

    // Return the newly created property as JSON response
    res.status(201).json(property);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET property details by ID
router.get("/properties/:id", async (req, res) => {
  try {
    // Retrieve property details from the database
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Return property details as JSON response
    res.json(property);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT update an existing property by ID
router.put("/properties/:id", async (req, res) => {
  try {
    // Extract property data from request body
    const { title, description, price, location, panoramicViewUrls } = req.body;

    // Find the property by ID and update its fields
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        location,
        panoramicViewUrls,
      },
      { new: true }
    );

    // Check if the property exists
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Return the updated property as JSON response
    res.json(property);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE delete a property by ID
router.delete("/properties/:id", async (req, res) => {
  try {
    // Find the property by ID and delete it
    const property = await Property.findByIdAndDelete(req.params.id);

    // Check if the property exists
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Return a success message
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET properties by search criteria
router.get("/properties/search", async (req, res) => {
  try {
    // Extract search criteria from query parameters
    const { location, minPrice, maxPrice, minBedrooms, maxBedrooms } = req.query;

    // Construct query object based on search criteria
    const query = {};
    if (location) query.location = { $regex: location, $options: "i" }; // Case-insensitive search
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (minBedrooms) query.bedrooms = { $gte: minBedrooms };
    if (maxBedrooms) query.bedrooms = { ...query.bedrooms, $lte: maxBedrooms };

    // Execute the search query
    const properties = await Property.find(query);

    // Return search results as JSON response
    res.json(properties);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
