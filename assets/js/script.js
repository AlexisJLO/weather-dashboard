var searchInput = document.getElementById('searching');
var searchButton = document.querySelector('.search-btn');
var containerInfo = document.querySelector('.container-info');
var APIKey = '77553182bf58d50d76e4a80e18aebf78';

searchButton.addEventListener('click', function(event){
    event.preventDefault();

    var searchingInput = searchInput.value;
    if(searchingInput.trim() !== ""){
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchingInput + "&appid=" + APIKey;
        fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            console.log('working');
            if (data.cod === 200) {
                var temperature = data.main.temp;
                var humidity = data.main.humidity;
                var windSpeed = data.wind.speed;

                var cityNameElement = document.querySelector('.cityName');
                var cityTempElement = document.querySelector('.cityTemp');
                var cityWindElement = document.querySelector('.cityWind');
                var cityHumElement = document.querySelector('.cityHum');

                cityNameElement.textContent = "Name of city date: " + searchingInput;
                cityTempElement.textContent = "Temperature: " + temperature + "°C";
                cityWindElement.textContent = "Wind: " + windSpeed + " m/s";
                cityHumElement.textContent = "Humidity: " + humidity + "%";
            }
        })
    }
});
