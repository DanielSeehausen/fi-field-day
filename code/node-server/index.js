// const path = require("path")
// const staticPath = path.join(__dirname, '/public')
// const fourOhFourPath = staticPath + '/four-oh-four/'

const express = require('express')
const config = require('./config')

const validator = require('./src/middleware/validator.js')
const logger = require('./src/middleware/logger.js')
const limiter = require('./src/middleware/rateLimiter.js')

const Group = require('./src/app/group.js')
const Game = require('./src/app/game.js')
const Netstat = require('./src/app/netstat')
const game = new Game()


const app = express()

/*************************** VALIDATOR ******************************/
app.use(validator)

/************************** RATE LIMITER ****************************/
app.use(limiter)

//************************* REQ LOGGER **************************
app.use(logger)

//***************************** VALID URL ROUTING ******************************
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/tile', (req, res) => { // /tile?x=x&y=y&c=c&id=ID
  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  res.send(true)
})

app.get('/tile', (req, res) => {
  const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
  res.send(payload)
})

// board?id=0; id coming from brwsr client config
app.get('/board', (req, res) => {
  res.send(new Buffer(game.getBoard(), 'binary'))
})


//******************** GROUP ROUTING **********************
app.get('/groups', (req, res) => {
  const group = Group.all[req.query.id]
  res.send(JSON.stringify(group))
})

//******************** GROUP NETSTAT **********************
app.get('/netstat', (req, res) => {
  const netstat = Netstat.getNetstat(game)
  res.send(JSON.stringify(netstat))
})

app.get('/allGroups', (req, res) => {
  try {
    res.send(JSON.stringify(Object.values(Group.all)))
  } catch (e) {
    console.error("fetching all groups broke...:\n", e)
  }
})


//***************************** REQ ERROR HANDLING *****************************
// 404
// app.use(express.static(fourOhFourPath)) // 404 assets
// app.use((req, res) => {
// removed this for now because rate limiter is stopping the asset transfer and no time to add in the exception for 404 stuff.
// even understanding that, the concern is being overwhelmed with requests so its best maybe not to be sending those assets without from the same server :/
// res.status(404).sendFile(fourOhFourPath + "404bundle.html")
//   res.status(404).send('check endpoint')
// })

// 400 and catch all (should be 400 but cant fix atm)
app.use((err, req, res, next) => {
  res.status(400).send('invalid endpoint or params')
})

//*********************************** START! ***********************************

app.listen(config.HTTPPORT, () => console.log(`App listening on port ${config.HTTPPORT}!`))
console.log("Loaded with config:\n", config)
