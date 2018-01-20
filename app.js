const request = require('request');
const yargs = require('yargs');

const { argv } = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help();
const { address } = argv;
const encodedAddress = encodeURIComponent(address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBe9ykA30J-jH9cRpt6G1xKOjj4nqQmomk`,
  json: true,
}, (error, response, body) => {
  console.log(`${body.results[0].formatted_address}`);
});
