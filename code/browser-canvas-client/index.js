const config = {
  DEFAULTLENGTH: 100,
  DEFAULTARRAY: new Uint8ClampedArray(Math.pow(100, 2) * 4).fill('33'),
  HTTPENDPOINT: 'http://localhost:3000',
  WSENDPOINT: 'ws://localhost:8080',
  ID: 0 //preassigned group ids
}

const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT)

const zoom = document.getElementById("zoom")
const zoomer = document.getElementById("zoomer")
const zoomOutput = document.getElementById("zoomOutputId")
zoom.oninput = (e) =>{
  zoomOutput.value = (e.target.value)
  zoomer.style.transform = `scale(${e.target.value/100}, ${e.target.value/100})`
}


/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 50; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}
// httpConn.setTile(0, 0, 'FF0000') // x, y, hex string color sans #
// httpConn.setTile(1, 0, 'FF0000')
// httpConn.setTile(0, 1, 'FF0000')
// httpConn.setTile(1, 1, 'FF0000')
//
// httpConn.setTile(2, 0, 'FF0000')
// httpConn.setTile(2, 1, 'FF0000')
// httpConn.setTile(2, 2, 'FF0000')
//
// httpConn.setTile(0, 2, 'FF0000')
// httpConn.setTile(1, 2, 'FF0000')
// httpConn.setTile(2, 2, 'FF0000')
httpConn.getGroupInfo()
