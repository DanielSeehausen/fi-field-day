const express = require('express')
const app = express()
const url = require('url');
const bodyParser = require('body-parser');
const { WSSManager } = require('./socket-server.js')
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIG
const size = 500
const port = 3001
const teamID = 1
const HTTPEndpoint = "http://localhost:3000"
 
// GLOBAL VARS
let queue = []
let interval = null 

// SOCKET
const socket = new WSSManager()

// HELPERS
function startInterval() {
  interval = setInterval(() => {
    if (queue.length > 0) {
      let nextPoint = queue.shift()
      socket.setTile(nextPoint.x, nextPoint.y, nextPoint.color)
      console.log("SENDING POINT: ", nextPoint)
    } else {
      clearInterval(interval)
      interval = null
    }
  }, 1000)
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
  	let color = socket.board[`${x}-${y}`]
    res.send({x,y,color})
  } else {
    res.send({error: "Invalid query parameters."})
  }
})

app.get("/board", (req, res) => {
	res.send(socket.convertBoard())
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