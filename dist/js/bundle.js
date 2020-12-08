/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style/index.scss":
/*!**************************!*\
  !*** ./style/index.scss ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/fiveDaysWeather/fiveDaysWeather.js":
/*!***********************************************************!*\
  !*** ./src/components/fiveDaysWeather/fiveDaysWeather.js ***!
  \***********************************************************/
/*! namespace exports */
/*! export setFiveDaysData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFiveDaysData": () => /* binding */ setFiveDaysData
/* harmony export */ });
/* harmony import */ var _services_weatherApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/weatherApi */ "./src/services/weatherApi.js");
/* harmony import */ var _oneDayWeather_oneDayWeather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../oneDayWeather/oneDayWeather */ "./src/components/oneDayWeather/oneDayWeather.js");



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

const setFiveDaysData = async () => {
  let currentCity = window.localStorage.getItem("city");
  let weatherData = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_0__.getFiveDayWeather)(currentCity);
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
      windDirection = (0,_oneDayWeather_oneDayWeather__WEBPACK_IMPORTED_MODULE_1__.setWeatherDirection)(item),
      wind = `${windSpeed}, ${windDirection}`,
      date = new Date(item.dt * 1000).toLocaleDateString("en-Us", options);

    createRow(date, temp, feels, icon, weatherDesc, wind, pressure, humidity);
  });
};


/***/ }),

/***/ "./src/components/oneDayWeather/oneDayWeather.js":
/*!*******************************************************!*\
  !*** ./src/components/oneDayWeather/oneDayWeather.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export setOneDayData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setWeatherDirection [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setWeatherDirection": () => /* binding */ setWeatherDirection,
/* harmony export */   "setOneDayData": () => /* binding */ setOneDayData
/* harmony export */ });
/* harmony import */ var _services_weatherApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/weatherApi */ "./src/services/weatherApi.js");


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

const setWeatherDirection = (data) => {
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

const setOneDayData = async () => {
  let currentCity = window.localStorage.getItem("city");
  let weatherData = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather)(currentCity);
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/index.scss */ "./style/index.scss");
/* harmony import */ var _services_weatherApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/weatherApi */ "./src/services/weatherApi.js");
/* harmony import */ var _components_oneDayWeather_oneDayWeather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/oneDayWeather/oneDayWeather */ "./src/components/oneDayWeather/oneDayWeather.js");
/* harmony import */ var _components_fiveDaysWeather_fiveDaysWeather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/fiveDaysWeather/fiveDaysWeather */ "./src/components/fiveDaysWeather/fiveDaysWeather.js");






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

  let currentWeather = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather)(currentCity);

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
    if (await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather)(searchInput.value)) {
      let city = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather)(searchInput.value);
      window.localStorage.setItem("city", city.name);
      setDate();
      (0,_components_oneDayWeather_oneDayWeather__WEBPACK_IMPORTED_MODULE_2__.setOneDayData)();
      (0,_components_fiveDaysWeather_fiveDaysWeather__WEBPACK_IMPORTED_MODULE_3__.setFiveDaysData)();
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
  let currentWeather = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather)(currentCity);
  let fiveDaysWeather = await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getFiveDayWeather)(currentCity);

  console.log(currentWeather);
  console.log(fiveDaysWeather);

  setDate();
  (0,_components_oneDayWeather_oneDayWeather__WEBPACK_IMPORTED_MODULE_2__.setOneDayData)();
  (0,_components_fiveDaysWeather_fiveDaysWeather__WEBPACK_IMPORTED_MODULE_3__.setFiveDaysData)();

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


/***/ }),

/***/ "./src/services/weatherApi.js":
/*!************************************!*\
  !*** ./src/services/weatherApi.js ***!
  \************************************/
/*! namespace exports */
/*! export getCurrentWeather [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFiveDayWeather [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentWeather": () => /* binding */ getCurrentWeather,
/* harmony export */   "getFiveDayWeather": () => /* binding */ getFiveDayWeather
/* harmony export */ });
const getCurrentWeather = async (city) => {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2082dd87628414a076525dc85ad4f71f`
  );

  if (!res.ok) {
    return false;

    // throw new Error(
    //   `Could not fetch http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2082dd87628414a076525dc85ad4f71f` +
    //     `, received ${res.status}`
    // );
  }
  return await res.json();
};

const getFiveDayWeather = async (city) => {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2082dd87628414a076525dc85ad4f71f`
  );

  if (!res.ok) {
    return false;
    // throw new Error(
    //   `Could not fetch http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2082dd87628414a076525dc85ad4f71f` +
    //     `, received ${res.status}`
    // );
  }
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map