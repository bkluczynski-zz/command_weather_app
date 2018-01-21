const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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

geocode.getAddress(argv.address)
  .then((results) => {
    geocode.getTemperature(results.latitude, results.longitude)
      .then((temp) => {
        console.log(`Current temperature is ${temp.weather}`);
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
    console.log(`Your address is ${results.address}`);
  })
  .catch((errorMessage) => {
    console.log('Something went wrong, ', errorMessage);
  });
