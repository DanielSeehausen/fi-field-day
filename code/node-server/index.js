// const path = require("path")
// const staticPath = path.join(__dirname, '/public')
// const fourOhFourPath = staticPath + '/four-oh-four/'

const express = require('express')
const config = require('./config')

const limiter = require('./src/middleware/rateLimiter.js')
const validator = require('./src/middleware/validator.js')

const Game = require('./src/app/game.js')
const game = new Game()

const app = express()

//*************************** VALIDATOR ******************************
app.use(validator)

//************************** RATE LIMITER ****************************
app.use(limiter)

//************************* HTTP REQ LOGGER **************************
// app.use(logger)

//***************************** VALID URL ROUTING ******************************
// TODO sub routers

app.post('/tile', (req, res) => {
  console.log(req.url)
  const tile = {
    x: parseInt(req.query.x),
    y: parseInt(req.query.y),
    hexStr: `${req.query.c}`
  }
  game.setTile(tile, req.query.id)
  console.log(game)
  res.status(200).send(true)
})

app.get('/tile', (req, res) => {
  const payload = JSON.stringify(game.getTile(req.query.x, req.query.y))
  res.send(payload)
})

app.get('/board', (req, res) => {
  console.log(req.url)
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(new Buffer(game.getBoard(), 'binary'))
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
