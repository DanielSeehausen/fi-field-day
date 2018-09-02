const express = require('express')
const app = express()
const url = require('url');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const Game = require('./Game.js')
const config = require("./config.js")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIG
const size = config.BOARDDIMENSION
const port = config.HTTPPORT
const teamID = config.GROUPID
const HTTPEndpoint = config.APIENDPOINT
 
// GLOBAL VARS
const queue = []

// game
const game = new Game()

// HELPERS
function startInterval() {
  setInterval(() => {
    // console.log(queue)
    if (queue.length > 0) {
      let nextPoint = queue.shift()
      console.log("SENDING ", nextPoint)
      game.setTile(nextPoint.x, nextPoint.y, nextPoint.c)
    }
  }, config.INTERVAL)
}
startInterval()

function checkValidPoint(x,y) {
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
  const c = req.body.c
  if (checkValidPoint(x,y)) {
    const coordinate = {x, y, c}
    queue.push(coordinate)
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
