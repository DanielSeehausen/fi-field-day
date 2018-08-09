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
httpConn.setTile(0, 0, 'FF0000') // x, y, hex string color sans #
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

fetch('http://localhost:3000/groups/0', { method: 'POST' })
  .then(r => r.json())
  .then(groupData => {
    //TODO not sure what we want to do here yet w/ group data
    console.log('%cCREATED GROUP! ', 'color: red', groupData)
  })
// TODO add fetch error handling

fetch('http://localhost:3000/groups/0', { method: 'GET' })
  .then(r => r.json())
  .then(groupData => {
    //TODO not sure what we want to do here yet w/ group data
    console.log('%cGETTED GROUP! ', 'color: green', groupData)
  })
