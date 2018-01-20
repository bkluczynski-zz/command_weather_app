const request = require('request');

const getAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBe9ykA30J-jH9cRpt6G1xKOjj4nqQmomk`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      console.log('Google services unavailable. Try again later.');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Try different address.');
    } else if (body.status === 'OK') {
      console.log(`${body.results[0].formatted_address}`);
    }
  });
};

module.exports = {
  getAddress,
};