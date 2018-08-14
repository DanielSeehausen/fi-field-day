const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT)
const canvasManager = new CanvasManager


/********************* Zoom Slide Handler ***************************************/

document.body.onkeydown = (e) =>{
  if (e.keyCode === 32) {
    console.log(e.keyCode)
    canvasManager.cycleZoom()
  }
}

/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 100; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}

httpConn.getGroupInfo()
