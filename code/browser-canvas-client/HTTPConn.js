class HTTPConn {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.setGroupInfo()
  }

  getBoard() {
    const route = `/board?id=${config.ID}`
    fetch(this.endpoint + route, { method: 'GET' })
      .then(response => response.arrayBuffer())
      .then(bufferData => {
        const pixelArray = new Uint8ClampedArray(bufferData)
        canvas.setImageFromArray(pixelArray)
        console.log('fetched board: ', pixelArray)
      })
  }

  setTile(x, y, c) {
    fetch(this.endpoint + `/tile?x=${x}&y=${y}&c=${c}&id=${config.ID}`, {
      method: 'Post',
      mode: 'no-cors'
    })
      .then(response => response)
      .then(x => {
        console.log(x.headers)
      })
  }

  getGroupInfo() {
    fetch(`${this.endpoint}/groups/${config.ID}`, { method: 'GET' })
      .then(r => r.json())
      .then(groupData => {
        console.log('%cGETTED GROUP! ', 'color: green', groupData)
      })
  }

  setGroupInfo() {
    fetch(`${this.endpoint}/groups/${config.ID}`, { method: 'POST' })
      .then(r => r.json())
      .then(groupData => {
        console.log('%cCREATED GROUP! ', 'color: red', groupData)
      })
  }
}
// function getTile(x, y, id='0') {
//   fetch(BASE + `/tile?x=${x}&y=${y}&id=${id}`, {
//     method: 'GET',
//     mode: 'no-cors',
//   })
//   .then(response => response)
//   .then(x => { console.log(x.headers.get("color")) })
// }

// function fourOhFour() {
//   fetch(BASE + '/nonsense', {
//     headers: {
//       'group-id': 33
//     },
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//   })
//   .then(response => response.json())
//   .then(x => console.log(x))
// }

// getTile(1, 1)
// setTile(1, 1, '333', 33)
// getBoard(33)
//
