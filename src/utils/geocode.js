const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FsdmltYXJ1ZiIsImEiOiJjazhuMjZlYWowdHl1M21xeHMxeXc5ZTN6In0.6Gia-zT5q5YcOCGXGevJpQ";

  request({ url, json: true }, function (error, response, body) {
    if (error) callback("Unable to connect to Map service", undefined);
    else if (body.features.length == 0)
      callback("Couldn't find the location.Try another search", undefined);
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
