var searchInput = document.getElementById('searching');
var searchButton = document.querySelector('.search-btn');
var containerInfo = document.querySelector('.container-info');
var APIKey = '77553182bf58d50d76e4a80e18aebf78';

searchButton.addEventListener('click', function (event) {
  event.preventDefault();

  var searchingInput = searchInput.value;
  if (searchingInput.trim() !== "") {
    fetchWeatherData(searchingInput);
  }
});

function fetchWeatherData(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.cod === 200) {
          // Current weather data
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          var icon = data.weather[0].icon;
  
          function kelvinToFahrenheit(kelvin) {
            var fahrenheit = (kelvin - 273.15) * 9/5 + 32;
            return fahrenheit;
          }
  
          var kelvinTemperature = temperature;
          var fahrenheitTemperature = kelvinToFahrenheit(kelvinTemperature);
  
          var cityNameElement = document.querySelector('.cityName');
          var cityTempElement = document.querySelector('.cityTemp');
          var cityWindElement = document.querySelector('.cityWind');
          var cityHumElement = document.querySelector('.cityHum');
          var iconElement = document.querySelector('.icon');
  
          cityNameElement.textContent = "Name of city: " + cityName;
          cityTempElement.textContent = "Temperature: " + fahrenheitTemperature + "°F";
          cityWindElement.textContent = "Wind: " + windSpeed + " m/s";
          cityHumElement.textContent = "Humidity: " + humidity + "%";
          iconElement.src = "https://openweathermap.org/img/w/" + icon + ".png";
        }
      })
      .then(function () {
        // Fetch the forecast data
        return fetch(forecastURL);
      })
      .then(function (response) {
        return response.json();
      })
      .then(forecastData => {
        console.log(forecastData);
        if (forecastData.cod === "200") {
          var forecastContainer = document.querySelector('.forecast');
          forecastContainer.innerHTML = "";
  
          for (var i = 0; i < forecastData.list.length; i += 8) {
            var forecastItem = forecastData.list[i];
            var forecastDate = new Date(forecastItem.dt * 1000);
  
            var forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');
  
            var dateElement = document.createElement('p');
            dateElement.textContent = forecastDate.toDateString();
  
            // You can add other forecast data here
  
            forecastCard.appendChild(dateElement);
            forecastContainer.appendChild(forecastCard);
          }
        }
      })
  }

document.getElementById('portlandBtn').addEventListener('click', function () {
    fetchWeatherData('Portland');
  });
  
  document.getElementById('losAngelesBtn').addEventListener('click', function () {
    fetchWeatherData('Los Angeles');
  });
  document.getElementById('lasVegasBtn').addEventListener('click', function () {
    fetchWeatherData('Las Vegas');
  });
  
  document.getElementById('newYorkBtn').addEventListener('click', function () {
    fetchWeatherData('New York');
  });
  
  
  document.getElementById('austinBtn').addEventListener('click', function () {
    fetchWeatherData('Austin');
  });
  
  document.getElementById('chicagoBtn').addEventListener('click', function () {
    fetchWeatherData('Chicago');
  });
  
  
  
     
  
  
