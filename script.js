// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const weatherInfo = document.getElementById('weatherInfo');
const errorDiv = document.getElementById('error');

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
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (data.error) {
            showError(data.error.message || 'Error fetching weather data');
            return;
        }

        const { current, location } = data;
        
        // Update weather information
        document.getElementById('temperature').textContent = `Temperature: ${current.temp_c}°C`;
        document.getElementById('condition').textContent = `Condition: ${current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${current.humidity}%`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${current.wind_kph} km/h`;

        // Hide error and show weather info
        errorDiv.classList.remove('show');
        weatherInfo.style.display = 'block';
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    document.getElementById('weatherInfo').style.display = 'none';
} 