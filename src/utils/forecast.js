const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c563f45e5ab3b2e63ee99e583d50b8a8&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url, json: true }, (error, response, body) => {
    const { temperature, precip } = body.current;
    if (error) callback("Unable to connect to weather service", undefined);
    else if (body.error) callback("Unable to find location", undefined);
    else
      callback(
        undefined,
        "It is currently " +
          temperature +
          " degrees out. There is a " +
          precip +
          "% chance of rain."
      );
  });
};

module.exports = forecast;
