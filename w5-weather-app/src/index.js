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

function errorCallback(response) {
  console.error(response);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation, errorCallback);
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

searchCity("New York");

//Search a city change title and main tempeture
// let h2 = document.querySelector("h2");

// ////function for updating city in API url
// function city() {
//   let cityname = document.querySelector("h2").innerHTML;
//   return cityname;
// }

// ////function to search data in API and replace in main display current temp of searched city
// function cvalue(response) {
//   let maintemp = document.querySelector("#maintemp");
//   maintemp.innerHTML = Math.round(response.data.main.temp);
//   console.log(response.data);
// }

// ////function to update temp value
// function updateTemp() {

//   axios.get(apiUrlm).then(cvalue);
// }

//function to modified city value based on inserted input
// function cityvalue(event) {
//   event.preventDefault();
//   let inputcity = document.querySelector("#city");
//   h2.innerHTML = `${inputcity.value}`;
// }

//   /////recall function to update h2 (city) of input
//   updateTemp();
// }

// // navigator.geolocation.getCurrentPosition(showPosition);

// //

// //   ;
// //   // let maintemp = document.querySelector("#maintemp");
// //   // maintemp.innerHTML = Math.round(response.data.main.temp);
// // }

// //making botton and search input
// let inputclick = document.querySelector("#search");
// inputclick.addEventListener("click", displayWeatherCondition());

// updateTemp();

//let unitf = "imperial";
//let apiUrlf = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitf}&appid=${apiKey}`;

// let cclick = document.querySelector("#c");
// cclick.addEventListener("click", cvalue);

// function fvalue(response) {
//   maintemp.innerHTML = Math.round(response.data.main.temp);
// }
// let fclick = document.querySelector("#f");
///// fclick.addEventListener("click", fvalue);/
