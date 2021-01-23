const axios = require("axios");
const chalk = require("chalk");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1941dedc19255287a7b4c4dbe9140aaf&query=" +
    `${address}`;
  // console.log(url);
  axios(url)
    .then((res) => {
      if (res.data.error) {
        // console.log(res.data);
        return callback("Location not found search again", undefined);
      } else {
        const temp = res.data.current.temperature;
        const precip = res.data.current.precip;
        const location = `${res.data.location.name} , ${res.data.location.region} , ${res.data.location.country}`;
        const weatherDes = res.data.current.weather_descriptions[0];
        return callback(
          undefined,
          weatherDes +
            ` currently the Temprature is ${temp}, and the possibility of rain is ${precip} percentage`,
          location
        );
      }
      // console.log();
    })
    .catch((err) => {
      console.log(err);
      callback("Unable to connect the servers", undefined);
    });
  //   console.log(url);
};

module.exports = forecast;
