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

/******************* Sample Tile Setting***************************************/

httpConn.getBoard() //fetch initial state of board
for (let i = 0; i < 100; i++) {
  httpConn.setTile(i, i, 'FF0000') // x, y, hex string color sans #
}

httpConn.getGroupInfo()
