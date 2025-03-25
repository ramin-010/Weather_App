import http from 'http';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Key from environment variables
const API_KEY = process.env.API_KEY;

// Create server
const server = http.createServer((req, res) => {
    // Handle API requests
    if (req.url.startsWith('/api/weather')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const city = url.searchParams.get('city');

        if (!city) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Please provide a city name' }));
            return;
        }

        // Fetch weather data
        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
            .then(response => response.json())
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Error fetching weather data' }));
            });
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, req.url);
    if (filePath === path.join(__dirname, '/')) {
        filePath = path.join(__dirname, 'index.html');
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 