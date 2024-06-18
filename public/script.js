document
  .getElementById("fetchWeatherButton")
  .addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

function formatNumber(number) {
  return number.toFixed(3).padStart(6, "0");
}

function fetchWeatherData(position) {
  // const lat = position.coords.latitude;
  // const lon = position.coords.longitude;

  fetch(`http://localhost:3000/api?lat=${22.33333}&lon=${70.83333}`)
    .then((response) => response.json())
    .then((data) => {
      var cel = data.main.temp - 273;

      const weatherDataDiv = document.getElementById("weatherData");
      weatherDataDiv.innerHTML = `
          <p>The country is <b><u>${data.sys.country}</u></b></p>
          <p>The city is <b><u>${data.name}</u></b></p>
          <p>Temperature: <b><u>${formatNumber(cel)} °C</u></b></p>
          <p>Weather: <b><u>${data.weather[0].description}</u></b></p>
          <p>The wind speed is <b><u>${data.wind.speed} kmph </u></b></p>
          <p>The humidity is <b><u>${data.main.humidity} g.m-3 </u></b></p>
        `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  // lon: 70.7618, lat: 22.2694
}

function showError(error) {
  console.error("Geolocation error:", error);
}
