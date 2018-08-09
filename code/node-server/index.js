// const path = require("path")
// const staticPath = path.join(__dirname, '/public')
// const fourOhFourPath = staticPath + '/four-oh-four/'

const express = require('express')
const config = require('./config')

const validator = require('./src/middleware/validator.js')
// const logger = require('./src/middleware/logger.js')
const limiter = require('./src/middleware/rateLimiter.js')

const Game = require('./src/app/game.js')
const game = new Game()
const Group = require('./src/app/group.js')

const app = express()

/*************************** VALIDATOR ******************************/
app.use(validator)

/************************** RATE LIMITER ****************************/
app.use(limiter)

//************************* REQ LOGGER **************************
// app.use(logger)

//***************************** VALID URL ROUTING ******************************
// TODO determine what is needed here for what routes when using the nexus/browser
// app.use((req, res) => {
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   next()
// })

app.post('/tile', (req, res) => {
  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  const groupId = parseInt(req.query.id)
  // don't love iterating each time users write to the board; could potentially stall our app
  const group = Group.all.find(g => g.id === groupId)
  group.addWrite()
  res.send(true)
})

app.get('/tile', (req, res) => {
  const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
  res.send(payload)
})

// board?id=0; id coming from brwsr client config
app.get('/board', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(new Buffer(game.getBoard(), 'binary'))
})

// GROUPS GROUPS GROUPS

app.get('/groups', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const groupId = parseInt(req.query.id)
  const targetGroup = Group.all.find(group => group.id === groupId)
  const groupData = targetGroup.stats()
  res.send(JSON.stringify(groupData))
})

app.post('/groups', (req, res) => {
  // res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  const groupId = parseInt(req.query.id)
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
// app.use((req, res) => {
// removed this for now because rate limiter is stopping the asset transfer and no time to add in the exception for 404 stuff.
// even understanding that, the concern is being overwhelmed with requests so its best maybe not to be sending those assets without from the same server :/
// res.status(404).sendFile(fourOhFourPath + "404bundle.html")
//   res.status(404).send('check endpoint')
// })

// 404 and catch all (should be 400 but cant fix atm)
app.use((err, req, res, next) => {
  res.status(400).send('invalid endpoint or params')
})

//*********************************** START! ***********************************
app.listen(config.HTTPPORT, () => console.log(`App listening on port ${config.HTTPPORT}!`))
