export const getCurrentWeather = async (city) => {
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

export const getFiveDayWeather = async (city) => {
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
