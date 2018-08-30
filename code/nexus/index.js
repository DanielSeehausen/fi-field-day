const express = require('express')
const app = express()
const url = require('url');
const bodyParser = require('body-parser');
const Game = require('./game.js')
const config = require("./config.js")
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIG
const size = config.BOARDDIMENSION
const port = config.HTTPPORT
const teamID = config.GROUPID
const HTTPEndpoint = `http://localhost:${config.SERVERHTTPPORT}`
 
// GLOBAL VARS
let queue = []
let interval = null 

// game
const game = new Game()

// HELPERS
function startInterval() {
  interval = setInterval(() => {
    if (queue.length > 0) {
      let nextPoint = queue.shift()
      game.setTile(nextPoint.x, nextPoint.y, nextPoint.color)
      // console.log("SENDING POINT: ", nextPoint)
    } else {
      clearInterval(interval)
      interval = null
    }
  }, config.INTERVAL)
}

function checkValidPoint(x,y){
  const integers = Number.isInteger(x) && Number.isInteger(y)
  const inRange = x >= 0 && y >= 0 && x < size && y < size 
  return integers && inRange
}


// ROUTES
app.get('/get-tile', (req, res) => {
  const x = parseInt(req.query.x, 10)
  const y = parseInt(req.query.y, 10)
  if (checkValidPoint(x,y)) {
  	let color = game.board[`${x}-${y}`]
    res.send({x,y,color})
  } else {
    res.send({error: "Invalid query parameters."})
  }
})

app.get("/board", (req, res) => {
	res.send(game.convertBoard())
})

app.post('/set-tile', (req, res) => {
  const x = req.body.x
  const y = req.body.y
  const color = req.body.color

  if (checkValidPoint(x,y)){
    const coordinate = {x,y,color}
    queue.push(coordinate)
    if (!interval) {
      startInterval()
    }
    res.send({success: "Successfully queued!", coordinate, position: queue.length})
  } else {
    res.send({error: "Invalid point."})
  }
})

app.get('/get-queue', (req, res) => {
  res.send(queue)
})

app.delete('/clear-queue', (req, res) => {
  let numItemsRemoved = queue.length
  queue = []
  res.send({message: `Queue successfully cleared. ${numItemsRemoved} items removed.`})
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
