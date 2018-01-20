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

geocode.getAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    const { latitude } = results;
    const { longitude } = results;
    if (latitude && longitude) {
      geocode.getTemperature(latitude, longitude, (err, temperature) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(temperature, undefined, 2));
        }
      });
    } else {
      console.log('correct your params');
    }
  }
});
