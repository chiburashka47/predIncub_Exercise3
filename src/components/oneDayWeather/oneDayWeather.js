import { getCurrentWeather } from "../../services/weatherApi";

const oneDayImg = document.querySelector(
    ".weather__container__oneday__left__img"
  ),
  oneDayTemp = document.getElementById("oneDayTemp"),
  oneDayFilsLike = document.getElementById("oneDayFilsLike"),
  oneDayHumidity = document.getElementById("oneDayHumidity"),
  oneDayPressure = document.getElementById("oneDayPressure"),
  oneDayWindSpeed = document.getElementById("oneDayWindSpeed"),
  oneDayWindDirection = document.getElementById("oneDayWindDirection"),
  oneDayTitle = document.querySelector(
    ".weather__container__oneday__left__text"
  );

export const setWeatherDirection = (data) => {
  let windDirection;
  if (data.wind.deg >= 340 || data.wind.deg < 25) {
    windDirection = "North";
  } else if (data.wind.deg >= 25 || data.wind.deg < 70) {
    windDirection = "North-East";
  } else if (data.wind.deg >= 70 || data.wind.deg < 110) {
    windDirection = "East";
  } else if (data.wind.deg >= 110 || data.wind.deg < 160) {
    windDirection = "South-East";
  } else if (data.wind.deg >= 160 || data.wind.deg < 200) {
    windDirection = "South";
  } else if (data.wind.deg >= 200 || data.wind.deg < 250) {
    windDirection = "South-West";
  } else if (data.wind.deg >= 250 || data.wind.deg < 290) {
    windDirection = "West";
  } else if (data.wind.deg >= 290 || data.wind.deg < 340) {
    windDirection = "North-West";
  }
  return windDirection;
};

export const setOneDayData = async () => {
  let currentCity = window.localStorage.getItem("city");
  let weatherData = await getCurrentWeather(currentCity);
  let windDirection = setWeatherDirection(weatherData);

  oneDayTitle.textContent = `${weatherData.weather[0].main} (${weatherData.weather[0].description})`;
  oneDayImg.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  oneDayTemp.textContent = `${Math.round(weatherData.main.temp)} °F`;
  oneDayFilsLike.textContent = `${Math.round(weatherData.main.feels_like)} °F`;
  oneDayHumidity.textContent = `${weatherData.main.humidity} %`;
  oneDayPressure.textContent = `${weatherData.main.pressure} gPa`;
  oneDayWindSpeed.textContent = `${weatherData.wind.speed} m/s, `;
  oneDayWindDirection.textContent = `${windDirection}`;
};
