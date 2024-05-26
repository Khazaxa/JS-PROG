const apiKey = '14479bde034ae64412f92982f8732eeb';
const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'http://api.openweathermap.org/data/2.5/forecast';

document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location-input');
    const addLocationButton = document.getElementById('add-location');
    const locationList = document.getElementById('location-list');
    const weatherDataContainer = document.getElementById('weather-data');
    const hourlyChartCtx = document.getElementById('hourly-chart').getContext('2d');

    let locations = JSON.parse(localStorage.getItem('locations')) || [];
    let weatherCache = JSON.parse(localStorage.getItem('weatherCache')) || {};

    function saveLocations() {
        localStorage.setItem('locations', JSON.stringify(locations));
    }

    function saveWeatherCache() {
        localStorage.setItem('weatherCache', JSON.stringify(weatherCache));
    }

    function fetchWeather(location) {
        return fetch(`${weatherEndpoint}?q=${location}&appid=${apiKey}`)
            .then(response => response.json());
    }

    function fetchForecast(location) {
        return fetch(`${forecastEndpoint}?q=${location}&appid=${apiKey}`)
            .then(response => response.json());
    }

    function updateWeather(location) {
        fetchWeather(location)
            .then(data => {
                if (data.cod !== 200) {
                    throw new Error(data.message);
                }
                weatherCache[location] = {
                    data,
                    timestamp: Date.now()
                };
                saveWeatherCache();
                displayWeather(location, data);
                updateForecast(location);
            })
            .catch(error => console.error('Błąd podczas pobierania danych pogodowych:', error));
    }

    function updateForecast(location) {
        fetchForecast(location)
            .then(data => {
                if (data.cod !== "200") {
                    throw new Error(data.message);
                }
                displayHourlyChart(location, data);
            })
            .catch(error => console.error('Błąd podczas pobierania danych prognozy:', error));
    }

    function displayWeather(location, data) {
        const weatherElement = document.createElement('div');
        weatherElement.className = 'weather-info';
        weatherElement.innerHTML = `
            <h3>${location}</h3>
            <p>Temperatura: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Wilgotność: ${data.main.humidity}%</p>
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <p>${data.weather[0].description}</p>
        `;
        weatherDataContainer.appendChild(weatherElement);
    }

    function displayHourlyChart(location, data) {
        const labels = [];
        const temps = [];
        for (let i = 0; i < 12; i++) {
            const forecast = data.list[i];
            labels.push(new Date(forecast.dt * 1000).toLocaleTimeString());
            temps.push((forecast.main.temp - 273.15).toFixed(2));
        }
        new Chart(hourlyChartCtx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: temps,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function loadWeather() {
        weatherDataContainer.innerHTML = '';
        locations.forEach(location => {
            if (weatherCache[location] && (Date.now() - weatherCache[location].timestamp < 300000)) {
                displayWeather(location, weatherCache[location].data);
                updateForecast(location);
            } else {
                updateWeather(location);
            }
        });
    }

    function addLocation(location) {
        if (locations.length >= 10) {
            alert('Możesz dodać maksymalnie 10 lokalizacji.');
            return;
        }
        if (locations.includes(location)) {
            alert('Lokalizacja już dodana.');
            return;
        }
        locations.push(location);
        saveLocations();
        updateWeather(location);
        renderLocations();
    }

    function removeLocation(location) {
        locations = locations.filter(l => l !== location);
        saveLocations();
        renderLocations();
        loadWeather();
    }

    function renderLocations() {
        locationList.innerHTML = '';
        locations.forEach(location => {
            const li = document.createElement('li');
            li.textContent = location;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Usuń';
            removeButton.addEventListener('click', () => removeLocation(location));
            li.appendChild(removeButton);
            locationList.appendChild(li);
        });
    }

    addLocationButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            addLocation(location);
            locationInput.value = '';
        }
    });

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location) {
                addLocation(location);
                locationInput.value = '';
            }
        }
    });

    setInterval(loadWeather, 300000);
    renderLocations();
    loadWeather();
});
