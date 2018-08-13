const canvas = new Canvas(config.DEFAULTLENGTH, config.DEFAULTARRAY)
const httpConn = new HTTPConn(config.HTTPENDPOINT)
const socketConn = new SocketConn(config.WSENDPOINT)
const canvasManager = new CanvasManager


/********************* Zoom Slide Handler ***************************************/

const zoomSlider = document.getElementById("zoomSlider")

zoomSlider.oninput = (e) =>{
  canvasManager.handleZoom(e)
}


/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 100; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}

httpConn.getGroupInfo()
