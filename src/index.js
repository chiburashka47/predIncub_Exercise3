import "../style/index.scss";
import { getCurrentWeather, getFiveDayWeather } from "./services/weatherApi";

const timeInCityElem = document.querySelector(
    ".header__container__right__time"
  ),
  timeUtcElem = document.querySelector(".header__container__right__utc"),
  searchInput = document.querySelector(".header__container__middle__input"),
  errorMsg = document.querySelector(".header__container__middle__error"),
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

  searchBtn.addEventListener("click", async () => {
    if (searchInput.value !== "") {
      if (await getCurrentWeather(searchInput.value)) {
        window.localStorage.setItem("city", searchInput.value);
        setDate();
        errorMsg.classList.add("hide");
      } else {
        errorMsg.classList.remove("hide");
      }
    }
  });
});
