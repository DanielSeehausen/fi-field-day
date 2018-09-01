const config = require('./config.js')
const express = require('express')

const app = express()

function isValidPoint(x, y) {
  const integers = Number.isInteger(x) && Number.isInteger(y)
  const inRange = x >= 0 && y >= 0 && x < config.BOARDDIMENSION && y < config.BOARDDIMENSION
  return integers && inRange
}

app.get('/tile', (req, res) => {
  const x = parseInt(req.query.x, 10)
  const y = parseInt(req.query.y, 10)

  if (isValidPoint(x, y)) { //TODO this should be handled as middleware and automatically return error on fail
    res.send({x, y, c: game.getTile(x, y)})
  } else {
    res.send({error: "Invalid query parameters."})
  }
})

app.post('/tile', (req, res) => {
  const x = req.query.x
  const y = req.query.y
  const color = req.query.c

  if (isValidPoint(x, y)) { //TODO this should be handled as middleware and automatically return error on fail
    const action = {endpoint: "setTile", params: {x, y, color, id: config.GROUPID}}
    game.enqueue(action)
    res.status(200).send(`Successful enqued: ${action}`)
  } else {
    res.send({error: "Invalid query parameters."})
  }
})

app.get('/board', (req, res) => {
  res.send(JSON.stringify(game.board))
})


app.get('/queue', (req, res) => {
  res.send(JSON.stringify(game.queue))
})

app.delete('/queue', (req, res) => {
  const items = queue.length
  game.queue.clear() // todod can't remember does clear work on js array?
  res.send({message: `Queue successfully cleared. ${items} items removed.`})
})

// dank
app.listen(config.HTTPPORT, () => console.log("Example app listening on port ", config.HTTPPORT, "!"))
