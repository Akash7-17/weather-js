let api_key = "9b1373f660aba8fc3a8f3011af3203dd";

document.getElementById('searchButton').addEventListener('click', searchWeather);
document.getElementById('cityInput').addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

const weatherIconMap = {
  "01d": "images/clear.png",
  "01n": "images/clear.png",
  "02d": "images/clouds.png",
  "02n": "images/clouds.png",
  "03d": "images/drizzle.png",
  "03n": "images/drizzle.png",
  "04d": "images/drizzle.png",
  "04n": "images/drizzle.png",
  "09d": "images/rain.png",
  "09n": "images/rain.png",
  "10d": "images/rain.png",
  "10n": "images/rain.png",
  "13d": "images/snow.png",
  "13n": "images/snow.png"
};

async function searchWeather() {
  let city = document.getElementById('cityInput').value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('errorMessage').style.display = 'none';

  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.cod === "404") {
      document.getElementById('loadingMessage').style.display = 'none';
      document.getElementById('errorMessage').style.display = 'block';
      return;
    }

    // Update the weather details
    document.getElementById('temp').textContent = `${Math.floor(data.main.temp)}°C`;
    document.getElementById('location').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('lat').textContent = data.coord.lat;
    document.getElementById('log').textContent = data.coord.lon;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} km/h`;

    let weatherIconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = weatherIconMap[weatherIconCode] || 'images/clear.png';

    document.getElementById('loadingMessage').style.display = 'none';
  } catch (error) {
    console.error("An error occurred:", error.message);
    document.getElementById('errorMessage').textContent = "An error occurred while fetching weather data.";
    document.getElementById('errorMessage').style.display = 'block';
  }
}
