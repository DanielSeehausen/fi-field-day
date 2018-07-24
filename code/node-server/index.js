const path = require("path")
const express = require('express')
require('module-alias/register') // allows @aliases for require paths
const config = require('@config')

const limiter = require('@middleware/rate-limiter.js')
const validator = require('@middleware/reqValidators/validator.js')

const staticPath = path.join(__dirname, '/public')
const fourOhFourPath = staticPath + '/four-oh-four/'

const Game = require('./src/game.js')

const app = express()
const game = new Game()

//*************************** VALIDATOR ******************************
app.use(validator) 

//************************** RATE LIMITER ****************************
app.use(limiter)

//************************* HTTP REQ LOGGER **************************
app.use(logger)

//***************************** VALID URL ROUTING ******************************
app.post('/setTile', (req, res) => {
  const tile = {
    x: req.query.x,
    y: req.query.y,
    c: `#${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  res.status(200).send()
})

app.get('/getBoard', (req, res) => {
  res.status(200).send(JSON.stringify(game.getBoardHTTP()))
})

app.get('/getTile', (req, res) => {
  const color = game.getTile(req.query.x, req.query.y)
  res.set('color', color)
  res.status(200).send(color)
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




// function assignGroup(req) {
//   // TODO: doubling up on reqValidator should be fixed
//   if (!req.query.id) return false
//   if (req.query.id < config.IDLIMIT["low"] || req.query.id > config.IDLIMIT["high"]) return false
//   try {
//     const group = game.findGroup(req.query.id, req.connection.remoteAddress)
//     if (!group) return false
//     req.query.group = group
//     return true
//   } catch(e) {
//     console.error(`assigning group failed for id: ${req.query.id}`, e)
//     return false
//   }
// }
// 
// // assert valid headers and identity
// app.use((req, res, next) => {
//   const validReq = reqValidator(req)
//   const validGroup = assignGroup(req)
//   if (validReq && validGroup) return next()
//   if (validGroup) {
//     // if their request was bad, but the id was right, add to their group record as bad request
//     validGroup.addBadRequest()
//   }
//   res.status(400).send("invalid request!")
// })





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
