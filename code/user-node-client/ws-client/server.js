//Redis
const redis = require('redis')
const WebSocket = require('ws')
const redisConn = redis.createClient();

//WSS
function writeTile(obj) {
	redisConn.set(`${obj.x}-${obj.y}`, obj.c)
}

function writeBoard(arr) {
	arr.forEach((row, x) => {
		row.forEach((color, y) => {
			writeTile({x, y, c: color})
		})
	})
}

const dispatch = {
	"setBoard": writeBoard,
	"setTile": writeTile,
}

function handleMsg(msg) {
	const {action, payload} = JSON.parse(msg.data)
	console.log(action, payload)
	dispatch[action](payload)
}

function requestBoard(ws) {
	ws.send(JSON.stringify({action: "getBoard", payload: null}))
}


const wsConn = new WebSocket("ws://mayisgr8.win:8080")
wsConn.addEventListener('open', () => requestBoard(wsConn))
wsConn.addEventListener('message', (msg) => handleMsg(msg))
wsConn.addEventListener('close', () => console.log('ws closed'))
