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
      
        var temperature = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var icon = data.weather[0].icon;

        function kelvinToFahrenheit(kelvin) {
          var fahrenheit = (kelvin - 273.15) * 9/5 + 32;
          return fahrenheit.toFixed(2);
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
     
      return fetch(forecastURL);
    })
    .then(function (response) {
      return response.json();
    })
// ...
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
  
        var dateElement = document.createElement('h2');
        var formattedDate = forecastDate.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        });
        dateElement.textContent = formattedDate;
  
        var forecastTemperature = forecastItem.main.temp;
        var forecastHumidity = forecastItem.main.humidity;
        var forecastWindSpeed = forecastItem.wind.speed;
        var forecastIcon = forecastItem.weather[0].icon;
  
        function kelvinToFahrenheit(kelvin) {
          var fahrenheit = (kelvin - 273.15) * 9/5 + 32;
          return fahrenheit.toFixed(2); 
        }
  
        var fahrenheitTemperature = kelvinToFahrenheit(forecastTemperature);
  
        var forecastTempElement = document.createElement('p');
        var forecastWindElement = document.createElement('p');
        var forecastHumElement = document.createElement('p');
        var forecastIconElement = document.createElement('img');

        forecastTempElement.textContent = "Temp: " + fahrenheitTemperature + "°F";
        forecastWindElement.textContent = "Wind: " + forecastWindSpeed + " m/s";
        forecastHumElement.textContent = "Humidity: " + forecastHumidity + "%";
        forecastIconElement.src = "https://openweathermap.org/img/w/" + forecastIcon + ".png";

        forecastCard.appendChild(dateElement);
        forecastCard.appendChild(forecastIconElement);
        forecastCard.appendChild(forecastTempElement);
        forecastCard.appendChild(forecastWindElement);
        forecastCard.appendChild(forecastHumElement);
        forecastContainer.appendChild(forecastCard);
      }
    }
  })
// ...

  
    
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
