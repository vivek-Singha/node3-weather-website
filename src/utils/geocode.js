const axios = require("axios");

const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1Ijoidml2ZWswMyIsImEiOiJja2szb3c0cm0xY3k5MnZvNW8zcTQweTUxIn0.pyUbk_jjJ_PBmbQaup2NGw";

  //   console.log(url);

  axios
    .get(url)
    .then((res) => {
      // console.log(res.data);
      if (res.data.features.length === 0) {
        console.log(res.data);
        callback("Unable to find location. Try another Search.", undefined);
      } else {
        callback(undefined, {
          latitude: res.data.features[0].center[0],
          longitude: res.data.features[0].center[1],
          location: res.data.features[0].place_name,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      callback("Unable to connect to location services! 😀😀", undefined);
    });
};

module.exports = geocode;
