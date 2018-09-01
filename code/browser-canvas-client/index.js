const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT, canvas)
const canvasManager = new CanvasManager(config.dimension)
const dragger = new Dragger


/********************* Keyboard Input Handler ***************************************/
const keyCodes = [32, 37, 38, 39, 40, 65, 68, 83, 87]

document.body.onkeydown = (e) =>{
  if (keyCodes.includes(e.keyCode)) {
    canvasManager.handleMove(e)
  } if (e.keyCode === 75){
    canvasManager.resetMove()
    dragger.resetMove()
  }
}


/********************* Mouse Input Handler ***************************************/

const dragDiv = document.getElementById(`dragger`)
dragDiv.addEventListener('mousedown',  (e) => dragger.mouseDown(e))
document.addEventListener('mouseup',   (e) => dragger.mouseUp(e))
document.addEventListener('mousemove', (e) => dragger.mouseMove(e))


/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board

// for (let i = 0; i < 100; i++) {
//   httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
// }

httpConn.getGroupInfo()

// const pos = [
//   { x: 15, y: 15, c: '00FF00' },
//   { x: 70, y: 15, c: '00FF00' },
//   { x: 125, y: 15, c: '00FF00' },
//   { x: 180, y: 15, c: '00FF00' },
//   { x: 235, y: 15, c: '00FF00' },
//   { x: 290, y: 15, c: '00FF00' },
//   { x: 345, y: 15, c: '00FF00' },
//   { x: 400, y: 15, c: '00FF00' },
//   { x: 460, y: 15, c: '00FF00' },
//   { x: 460, y: 70, c: '00FF00' },
//   { x: 460, y: 125, c: '00FF00' },
//   { x: 460, y: 180, c: '00FF00' },
//   { x: 460, y: 235, c: '00FF00' },
//   { x: 460, y: 290, c: '00FF00' },
//   { x: 460, y: 345, c: '00FF00' },
//   { x: 460, y: 460, c: '00FF00' },
//   { x: 405, y: 460, c: '00FF00' },
//   { x: 350, y: 460, c: '00FF00' },
//   { x: 295, y: 460, c: '00FF00' },
//   { x: 240, y: 460, c: '00FF00' },
//   { x: 185, y: 460, c: '00FF00' },
//   { x: 130, y: 460, c: '00FF00' },
//   { x: 15, y: 460, c: '00FF00' },
//   { x: 15, y: 405, c: '00FF00' },
//   { x: 15, y: 350, c: '00FF00' },
//   { x: 15, y: 295, c: '00FF00' },
//   { x: 15, y: 240, c: '00FF00' },
//   { x: 15, y: 185, c: '00FF00' },
//   { x: 15, y: 130, c: '00FF00' }
// ]
//
// pos.forEach(pos => httpConn.setTile(pos))
