const API_KEY = "7b67d70eaeec890a73515793ca84a3ac";

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        displayCurrentWeather(data);

        // Fetch 5-day forecast
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastRes.json();
        displayForecast(forecastData);
    } catch (error) {
        alert("City not found!");
    }
}

function displayCurrentWeather(data) {
    const currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            <p>🌡️ Temp: ${data.main.temp}°C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "<h3>5-Day Forecast</h3>";
    
    // Show only one forecast per day (API returns every 3 hours)
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecast.innerHTML += `
            <div class="forecast-item">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                <p>${day.main.temp}°C</p>
                <p>${day.weather[0].main}</p>
            </div>
        `;
    }
}
