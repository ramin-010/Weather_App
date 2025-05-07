// DOM Elements
const city = document.getElementById('cityInput');
const search = document.getElementById('searchBtn');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const weatherInfo = document.getElementById('weatherInfo');
const windspeed = document.getElementById('windSpeed');
const errorDiv = document.getElementById('error');

search.addEventListener("click", getWeather);

async function getWeather() {
   
    try {
        const cityName = city.value.trim();
        if (!cityName) {
            alert('Please enter a city name');
            return;
        }

        const response = await axios.get(`/api/weather?city=${encodeURIComponent(cityName)}`);
        const data = response.data;

        // Update UI with weather data
        temp.textContent = `${data.current.temp_c}°C`;
        condition.textContent = data.current.condition.text;
        humidity.textContent = `${data.current.humidity}%`;
        windspeed.textContent = `${data.current.wind_kph} km/h`;

        // Show weather info and hide error
        weatherInfo.style.display = 'block';
        errorDiv.classList.remove('show');

    } catch (err) {
        console.error("Error:", err.message);
        errorDiv.textContent = 'Error fetching weather data. Please try again.';
        errorDiv.classList.add('show');
        weatherInfo.style.display = 'none';
    }
}
