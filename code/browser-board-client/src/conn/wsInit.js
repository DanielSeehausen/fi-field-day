import config from '../config.js'
import { setCellValue, setCellValues } from './receive'

const GREETING = "Client websocket opened"
const FAREWELL = "Client websocket closed"
const ERROR = "Client websocket errored"

const wsConn = wsConn || new WebSocket(config.WSSERVERENDPOINT)

const dispatcher = {
  'setTile': setCellValue,
  'setTiles': setCellValues,
  'setBoard': setCellValues // deprecated set board
}

function unpack(data) {
  const msg = JSON.parse(data)
  return [msg.action, msg.payload]
}

function dispatch(data) {

  const [action, payload] = unpack(data)
  console.log(data)
  dispatcher[action](payload)
}

function initEventListeners() {
  wsConn.addEventListener('open', (e) => {console.log(GREETING, e.data)})
  wsConn.addEventListener('message', (e) => {dispatch(e.data)})
  wsConn.addEventListener('close', (e) => {console.log(FAREWELL, e.data)})
  wsConn.addEventListener('error', (e) => {console.error(ERROR, e.data)})
}

export default function init() {
  initEventListeners()
}
