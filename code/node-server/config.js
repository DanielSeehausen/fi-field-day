// hard coding how identicons are done right now for a 500x500 board
const argv = require('yargs').argv // use yargs to parse command line args to set num groups
module.exports = {
  ROWS: 500,
  COLUMNS: 500,
  HTTPPORT: 3000,
  WSPORT: 8080,
  IDLIMIT: { low: 0, high: argv.groups ? argv.groups : 35 }, // max 40 led to overlapping identicons -> set max to 35
  LIMITWINDOW: 1000,
  LIMITCOUNT: 5,
  ADMIN_SECRET: '0' // TODO: make secret, add to .gitignore
}
