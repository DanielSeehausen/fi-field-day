// const path = require("path")
// const staticPath = path.join(__dirname, '/public')
// const fourOhFourPath = staticPath + '/four-oh-four/'

const express = require('express')
const config = require('./config')

const limiter = require('./src/middleware/rateLimiter.js')
const validator = require('./src/middleware/validator.js')

const Game = require('./src/app/game.js')
const game = new Game()
const Group = require('./src/app/group.js')

const app = express()

/*************************** VALIDATOR ******************************/
// app.use(validator) //TODO: add group to validator

/************************** RATE LIMITER ****************************/
app.use(limiter)

/************************* HTTP REQ LOGGER **************************/
// app.use(logger)

/***************************** VALID URL ROUTING ******************************/

/***************************** Parse Fetch Body Params ************************/
// TODO sub routers

//tile?x=2&y=2&c=FF0000&id=0
// x, y, color as hex string (no #)
app.post('/tile', (req, res) => {
  console.log(req.url)
  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  res.status(200).send(true)
})

app.get('/tile', (req, res) => {
  const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
  res.send(payload)
})

// board?id=0; id coming from brwsr client config
app.get('/board', (req, res) => {
  console.log(req.url)
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(new Buffer(game.getBoard(), 'binary'))
})

// GROUPS GROUPS GROUPS

app.get('/groups/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const groupId = parseInt(req.params.id)
  const targetGroup = Group.all.find(group => group.id === groupId)
  const groupData = targetGroup.stats()
  res.send(JSON.stringify(groupData))
})

app.post('/groups/:id', (req, res) => {
  // res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const groupId = parseInt(req.params.id)
  const newGroup = new Group(groupId)
  res.send(JSON.stringify(newGroup.stats()))
})

// app.get('/scores', (req, res) => {
//   // TODO: why this here
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//   res.status(200).json(JSON.stringify(game.getScores()))
// })
//
// app.get('/achievements', (req, res) => {
//   res.status(200).send(JSON.stringify(req.query.group))
// })
//
// app.get('/achievements/:id', (req, res) => {
//   res.status(200).send(JSON.stringify(req.query.group))
// })
//
// app.get('/netStat', (req, res) => {
//   if (req.query.id !== '0')
//     res.status(401).send()
//   // TODO: return some game/network data?
// })

//***************************** REQ ERROR HANDLING *****************************
// 404
// app.use(express.static(fourOhFourPath)) // 404 assets
app.use((req, res) => {
  // removed this for now because rate limiter is stopping the asset transfer and no time to add in the exception for 404 stuff.
  // even understanding that, the concern is being overwhelmed with requests so its best maybe not to be sending those assets without from the same server :/
  // res.status(404).sendFile(fourOhFourPath + "404bundle.html")
  res.status(404).send('check endpoint')
})

// 404 and catch all (should be 400 but cant fix atm)
app.use((err, req, res, next) => {
  res.status(400).send('invalid endpoint or params')
})

//*********************************** START! ***********************************
app.listen(3000, () => console.log('Example app listening on port 3000!'))
//
// Groups
// Asserted by group Id
// Which is passed in the req.query
//
// Look at old group class to get a feel
// Idea is to make it as minimally invasive in the game code as possible
// And need a new route and validation for group/:id to get their group info
// So browser can display their achievements
