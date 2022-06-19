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
}

//function to search city in API url
function searchCity(city) {
  let apiKey = "2a980a820d1b255b9609b3f0f671cc24";
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
  let apiKey = "2a980a820d1b255b9609b3f0f671cc24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
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

//Changing Celsius value
let maintempc = document.querySelector("#maintemp");

function cvalue(event) {
  event.preventDefault;
  maintempc.innerHTML = celsiusTemperature;
}
let cclick = document.querySelector("#c");
cclick.addEventListener("click", cvalue);

//Changing Fahrenheit value

let maintempf = document.querySelector("#maintemp");

function fvalue(event) {
  event.preventDefault;
  maintempf.innerHTML = fahrenheitTempeture;
}
let fclick = document.querySelector("#f");
fclick.addEventListener("click", fvalue);

searchCity("New York");
