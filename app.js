const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=12+Sandringham+Rd,+London+E8+2LR&key=AIzaSyBe9ykA30J-jH9cRpt6G1xKOjj4nqQmomk',
  json: true,
}, (error, response, body) => {
  console.log(body);
});
