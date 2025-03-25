// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');

// Event Listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data:', data); // For debugging

        // Update UI with weather data
        cityName.textContent = data.location.name;
        temp.textContent = data.current.temp_c;
        condition.textContent = data.current.condition.text;
        humidity.textContent = data.current.humidity;
    } catch (err) {
        console.error('Error:', err); // For debugging
        alert('Error fetching weather data. Please check your API key or city name.');
    }
} 