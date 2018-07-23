const path = require("path")
const fs = require('fs')
const express = require('express')

const limiter = require('./src/rate-limiter.js')

const staticPath = path.join(__dirname, '/public')
const fourOhFourPath = staticPath + '/four-oh-four/'
const logStream = fs.createWriteStream('./logs/http-req.log', {flags: 'a'})
const errStream = fs.createWriteStream('./logs/http-req-error.log', {flags: 'a'})
const reqValid = require('./src/reqValid.js')
const Game = require('./src/game.js')
const config = require('./config.js')

const app = express()
const game = new Game()


/* request handling order

*/


//*************************** LIMITER MIDDLEWARE *******************************
app.use(limiter)


//*************************** VALIDATION MIDDLEWARE ****************************
function assignGroup(req) {
  // TODO: doubling up on reqValid should be fixed
  if (!req.query.id) return false
  if (req.query.id < config.IDLIMIT["low"] || req.query.id > config.IDLIMIT["high"]) return false
  try {
    const group = game.findGroup(req.query.id, req.connection.remoteAddress)
    if (!group) return false
    req.query.group = group
    return true
  } catch(e) {
    console.error(`assigning group failed for id: ${req.query.id}`, e)
    return false
  }
}

// assert valid headers and identity
app.use((req, res, next) => {
  const validReq = reqValid(req)
  const validGroup = assignGroup(req)
  if (validReq && validGroup) return next()
  if (validGroup) {
    // if their request was bad, but the id was right, add to their group record as bad request
    validGroup.addBadRequest()
  }
  res.status(400).send("invalid request!")
})

//***************************** HTTP REQ LOGGING *******************************
// log success
app.use((req, res, next) => {
  logStream.write(`\n${req.connection.remoteAddress} ${req.url} ${Date.now()}`)
  next()
})

// log faliure
app.use((err, req, res, next) => {
  errStream.write(`\n${req.connection.remoteAddress} ${req.url} ${Date.now()}`)
  next(err)
})

//***************************** VALID URL ROUTING ******************************
app.get('/getBoard', (req, res) => {
  res.status(200).send(JSON.stringify(game.getBoardHTTP()))
})

app.get('/getTile', (req, res) => {
  const color = game.getTile(req.query.x, req.query.y)
  res.set('color', color)
  res.status(200).send(color)
})

app.post('/setTile', (req, res) => {
  game.setTile(req.query.x, req.query.y, '#' + req.query.c, req.query.group)
  res.status(200).send()
})

app.get('/getScores', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.status(200).json(JSON.stringify(game.getScores()))
})

app.get('/getGroup', (req, res) => {
  res.status(200).send(JSON.stringify(req.query.group))
})

//***************************** REQ ERROR HANDLING *****************************
// 404
app.use(express.static(fourOhFourPath)) // 404 assets
app.use((req, res) => {
  // removed this for now because rate limiter is stopping the asset transfer and no time to add in the exception for 404 stuff.
  // even understanding that, the concern is being overwhelmed with requests so its best maybe not to be sending those assets without from the same server :/
  // res.status(404).sendFile(fourOhFourPath + "404bundle.html")
  res.status(404).send("check endpoint")
})

// 404 and catch all (should be 400 but cant fix atm)
app.use((err, req, res, next) => {
  res.status(400).send("invalid endpoint or params")
})


//*********************************** START! ***********************************
app.listen(3000, () => console.log('Example app listening on port 3000!'))
