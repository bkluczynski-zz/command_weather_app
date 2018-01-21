const request = require('request');

const getTemperature = (lat, lng) =>
  new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/e8ffa8a65d4e06fa7cb561c3231d9beb/${lat},${lng}`,
      json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          weather: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        });
      } else {
        reject(new Error('Something went wrong'));
      }
    });
  });


const getAddress = address =>
  new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBe9ykA30J-jH9cRpt6G1xKOjj4nqQmomk`,
      json: true,
    }, (error, response, body) => {
      if (error) {
        reject(new Error('Google services unavailable. Try again later.'));
      } else if (body.status === 'ZERO_RESULTS') {
        reject(new Error('Try different address.'));
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      }
    });
  });

module.exports = {
  getAddress,
  getTemperature,
};
