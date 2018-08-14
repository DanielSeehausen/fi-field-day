// hard coding how identicons are done right now for a 500x500 board
module.exports = {
  ROWS: 100,
  COLUMNS: 100,
  HTTPPORT: 3001,
  WSPORT: 8080,
  IDLIMIT: {low: 0, high: 25},
  LIMITWINDOW: 1000,
  LIMITCOUNT: 5,
  ADMIN_SECRET: '0' // TODO: make secret, add to .gitignore
}
