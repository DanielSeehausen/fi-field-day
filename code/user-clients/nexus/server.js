const express = require('express')
const app = express()
const url = require('url');
const bodyParser = require('body-parser');
const { WSSManager } = require('./socket-server.js')

// CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const size = 500
const port = 3000

// GLOBAL VARS
let queue = []
let interval = null

// SOCKET
// const socket = new WSSManager()

// HELPERS
function startInterval() {
  interval = setInterval(() => {
    if (queue.length > 0) {
      let nextPoint = queue.shift()
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
    res.send({x,y, color: "FFFFFF"})
  } else {
    res.send({error: "Invalid query parameters."})
  }
})


app.post('/set-tile', (req, res) => {
  // Had to parseInt because they were failing the checkValidPoint test
  const x = parseInt(req.body.x)
  const y = parseInt(req.body.y)
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



app.listen(port, () => console.log('Example app listening on port 3000!'))
