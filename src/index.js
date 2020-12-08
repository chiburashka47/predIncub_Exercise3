import "../style/index.scss";
import { getCurrentWeather, getFiveDayWeather } from "./services/weatherApi";
import "./components/oneDayWeather/oneDayWeather";
import { setOneDayData } from "./components/oneDayWeather/oneDayWeather";
import { setFiveDaysData } from "./components/fiveDaysWeather/fiveDaysWeather";

const timeInCityElem = document.querySelector(
    ".header__container__right__time"
  ),
  timeUtcElem = document.querySelector(".header__container__right__utc"),
  searchInput = document.querySelector(".header__container__middle__input"),
  errorMsg = document.querySelector(".header__container__middle__error"),
  weatherTitle = document.querySelector(".weather__title"),
  oneDayContainer = document.querySelector(".weather__container__oneday"),
  fiveDaysContainer = document.querySelector(".weather__container__fivedays"),
  todayBtn = document.getElementById("oneday"),
  fivedaysBtn = document.getElementById("fivedays"),
  searchBtn = document.querySelector(".header__container__middle__btn");

const setDate = async () => {
  let currentCity = window.localStorage.getItem("city");

  let currentWeather = await getCurrentWeather(currentCity);

  const date = new Date();
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };

  let utcTime = date.getUTCHours() + ":",
    currentTime = date.getUTCHours() + currentWeather.timezone / 3600 + ":";
  utcTime +=
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  currentTime +=
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  timeUtcElem.textContent = `Time UTC: ${utcTime}`;
  timeInCityElem.textContent = `Time in ${currentCity} ${currentTime}, ${date.toLocaleString(
    "en-Us",
    options
  )}`;

  weatherTitle.textContent = `Weather in ${window.localStorage.getItem(
    "city"
  )}`;
};

const searchBtnListner = async () => {
  if (searchInput.value !== "") {
    if (await getCurrentWeather(searchInput.value)) {
      let city = await getCurrentWeather(searchInput.value);
      window.localStorage.setItem("city", city.name);
      setDate();
      setOneDayData();
      setFiveDaysData();
      errorMsg.classList.add("hide");
    } else {
      errorMsg.classList.remove("hide");
    }
  }
  searchInput.value = "";
};

window.addEventListener("load", async () => {
  if (!window.localStorage.getItem("city")) {
    window.localStorage.setItem("city", "Minsk");
  }
  let currentCity = window.localStorage.getItem("city");
  let currentWeather = await getCurrentWeather(currentCity);
  let fiveDaysWeather = await getFiveDayWeather(currentCity);

  console.log(currentWeather);
  console.log(fiveDaysWeather);

  setDate();
  setOneDayData();
  setFiveDaysData();

  searchBtn.addEventListener("click", async () => {
    searchBtnListner();
  });

  searchInput.addEventListener("keydown", async (event) => {
    if (event.keyCode === 13) {
      searchBtnListner();
    }
  });

  todayBtn.addEventListener("click", () => {
    todayBtn.classList.add("active");
    fivedaysBtn.classList.remove("active");
    oneDayContainer.classList.remove("hide");
    fiveDaysContainer.classList.add("hide");
  });

  fivedaysBtn.addEventListener("click", () => {
    fivedaysBtn.classList.add("active");
    todayBtn.classList.remove("active");
    oneDayContainer.classList.add("hide");
    fiveDaysContainer.classList.remove("hide");
  });
});
