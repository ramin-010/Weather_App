const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint to get weather data
app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;  
        if (!city) {
            return res.status(400).json({ error: 'Please provide a city name' });
        }

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.Api_key}&q=${city}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 