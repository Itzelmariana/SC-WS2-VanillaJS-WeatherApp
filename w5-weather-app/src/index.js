//Repited variable

let apiKey = "2a980a820d1b255b9609b3f0f671cc24";

//Date displayed by day of the day + up to date time
let currentmain = document.querySelector(".currentmain");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sat",
];
let day = days[now.getDay()];
let hrs = now.getHours();
let min = now.getMinutes();

if (hrs < 10) {
  hrs = `0${hrs}`;
}
if (min < 10) {
  min = `0${min}`;
}
currentmain.innerHTML = `${day} ${hrs}:${min}`;

//function to get data response from API link
function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#maintemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#wicon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);
  fahrenheitTempeture = Math.round((celsiusTemperature * 9) / 5 + 32);

  getForecast(response.data.coord);
}

//function to search city in API url
function searchCity(city) {
  let unitm = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitm}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//function to get city inserted in "Enter city" for API
function handleSumit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//function to search in current location in API
function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Forecast
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2" id="forecastdata">
        <div class="col week1">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weektempeture">
          <span class="mintemp"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="maxtemp"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Added action to buttons and search bar
let buttonmyloc = document.querySelector("#myloc");
buttonmyloc.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search");
searchForm.addEventListener("click", handleSumit);

let inputtext = document.querySelector("#city-input");
const enterKey = 13;
inputtext.addEventListener("keyup", function (event) {
  if (event.keyCode === enterKey) {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

//Retuned updated data
searchCity("New York");
