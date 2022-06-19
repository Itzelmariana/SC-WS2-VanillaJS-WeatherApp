//Add current time ("day of the day and up up date time")
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

function searchCity(city) {
  let apiKey = "2a980a820d1b255b9609b3f0f671cc24";
  let unitm = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitm}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

////function to search city in browser
function handleSumit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2a980a820d1b255b9609b3f0f671cc24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

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

// function to transform Celsius to Fahrenheit

// function displayFTempeture(event) {
//   event.preventDefault();
//   let ftemp = (14 * 9) / 5 + 32;
//   let tempElement = document.querySelector("#maintemp");
//   tempElement.innerHTML = Math.round(ftemp);
// }
// let flink = document.querySelector("#f");
// flink.addEventListener("click", displayFTempeture);

//

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

// function displayf(response) {
//   document.querySelector("#maintemp").innerHTML = Math.round(
//     response.data.main.temp
//   );
// }

// function fvalue(city) {
//   let unitf = "imperial";
//   let apiUrlf = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitf}&appid=${apiKey}`;

//   axios.get(apiUrlf).then(displayf);
// }

// function fvalue(event) {
//   event.preventDefault();
// }
// let fclick = document.querySelector("#f");
// fclick.addEventListener("click", fvalue);

searchCity("New York");

// ////function to search data in API and replace in main display current temp of searched city
// function cvalue(response) {
//   let maintemp = document.querySelector("#maintemp");
//   maintemp.innerHTML = Math.round(response.data.main.temp);
//   console.log(response.data);
// }
