const request = require('request');

const getAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBe9ykA30J-jH9cRpt6G1xKOjj4nqQmomk`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Google services unavailable. Try again later.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Try different address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitue: body.results[0].geometry.location.lng,
      });
    }
  });
};

module.exports = {
  getAddress,
};
