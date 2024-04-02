// Function to fetch property listings from the backend API
async function fetchPropertyListings() {
  try {
    // Make a GET request to the backend API endpoint
    const response = await fetch("http://localhost:3000/api/properties");
    if (!response.ok) {
      throw new Error("Failed to fetch property listings");
    }
    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to render property listings
function renderPropertyListings(propertyListings) {
  // Get the container element to display property listings
  const listingsContainer = document.getElementById("listings-container");
  // Clear any existing content
  listingsContainer.innerHTML = "";
  // Iterate over the property listings and create HTML elements to display them
  propertyListings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add("listing");
    listingElement.innerHTML = `
      <h2>${listing.title}</h2>
      <p>${listing.description}</p>
      <p>Price: $${listing.price}</p>
      <p>Location: ${listing.location}</p>
      <div class="panoramic-views">
        <h3>Panoramic Views:</h3>
        <ul>
          ${listing.panoramicViewUrls
            .map((url) => `<li><img src="${url}" alt="Panoramic View"></li>`)
            .join("")}
        </ul>
      </div>
    `;
    listingsContainer.appendChild(listingElement);
  });
}

// Function to initialize the application
async function init() {
  // Fetch property listings from the backend API
  const propertyListings = await fetchPropertyListings();
  // Render property listings
  renderPropertyListings(propertyListings);
}

// Call the init function to initialize the application
init();
