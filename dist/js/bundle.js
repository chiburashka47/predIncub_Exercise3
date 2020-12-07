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



const timeInCityElem = document.querySelector(
    ".header__container__right__time"
  ),
  timeUtcElem = document.querySelector(".header__container__right__utc"),
  searchInput = document.querySelector(".header__container__middle__input"),
  errorMsg = document.querySelector(".header__container__middle__error"),
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

  searchBtn.addEventListener("click", async () => {
    if (searchInput.value !== "") {
      if (await (0,_services_weatherApi__WEBPACK_IMPORTED_MODULE_1__.getCurrentWeather)(searchInput.value)) {
        window.localStorage.setItem("city", searchInput.value);
        setDate();
        errorMsg.classList.add("hide");
      } else {
        errorMsg.classList.remove("hide");
      }
    }
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

    throw new Error(
      `Could not fetch http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2082dd87628414a076525dc85ad4f71f` +
        `, received ${res.status}`
    );
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