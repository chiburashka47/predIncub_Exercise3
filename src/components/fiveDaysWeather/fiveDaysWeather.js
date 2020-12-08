import { getFiveDayWeather } from "../../services/weatherApi";
import { setWeatherDirection } from "../oneDayWeather/oneDayWeather";

const rowContainer = document.querySelector(".weather__container__fivedays");

const createRow = (
  date,
  temp,
  feels,
  icon,
  weatherDesc,
  wind,
  pressure,
  humidity
) => {
  rowContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="weather__container__fivedays__row">
        <div class="weather__container__fivedays__row__date">${date}</div>
        <div class="weather__container__fivedays__row__temp">${temp}</div>
        <div class="weather__container__fivedays__row__feels">${feels}</div>
        <div class="weather__container__fivedays__row__container">
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="weather__container__fivedays__row__container__img"></img>
        </div>
        <div class="weather__container__fivedays__row__desc">${weatherDesc}</div>
        <div class="weather__container__fivedays__row__wind">${wind}</div>
        <div class="weather__container__fivedays__row__pressure">${pressure}</div>
        <div class="weather__container__fivedays__row__humidity">${humidity}</div>
    </div>
            `
  );
};

export const setFiveDaysData = async () => {
  let currentCity = window.localStorage.getItem("city");
  let weatherData = await getFiveDayWeather(currentCity);
  weatherData.list.map((item) => {
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    let icon = item.weather[0].icon,
      temp = Math.round(item.main.temp),
      feels = Math.round(item.main.feels_like),
      humidity = item.main.humidity,
      pressure = item.main.pressure,
      weatherDesc = `${item.weather[0].main}, ${item.weather[0].description}`,
      windSpeed = item.wind.speed,
      windDirection = setWeatherDirection(item),
      wind = `${windSpeed}, ${windDirection}`,
      date = new Date(item.dt * 1000).toLocaleDateString("en-Us", options);

    createRow(date, temp, feels, icon, weatherDesc, wind, pressure, humidity);
  });
};
