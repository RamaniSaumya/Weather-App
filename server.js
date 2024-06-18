const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Basic route to test the server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Example route to make an HTTP GET request using Axios
app.get("/api", async (req, res) => {
  try {
    const { lat, lon } = req.query; // Extract latitude and longitude from query parameters
    const apiKey = "8b1302fe27b814fd670ef5f465e4ff1c"; // Replace with your actual API key
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
   
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
