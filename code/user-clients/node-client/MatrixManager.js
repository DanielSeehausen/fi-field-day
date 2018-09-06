const fetch = require('node-fetch');

class MatrixManager {
  constructor(id) {
    this.api_url = "http://localhost:3001"
    this.id = id
  }

  getBoard(){
    console.log("Need to build out")
  }

  getTile(object) {
    // Tested, working
    let get_tile_url = `${this.api_url}/get-tile?x=${object["x"]}&y=${object["y"]}`
    return fetch(get_tile_url)
      .then(resp => resp.json())
  }

  getQueue() {
    // Tested, working
    let get_queue_url = `${this.api_url}/get-queue`
    return fetch(get_queue_url)
      .then(resp => resp.json())
  }

  clearQueue() {
    // Tested, working
    let clear_queue_url = `${this.api_url}/clear-queue`
    return fetch(clear_queue_url, {method: 'delete'})
      .then(resp => resp.json())
  }

  setTile(obj) {
    // Tested, working
    let set_tile_url = `${this.api_url}/set-tile`

    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(Object.assign({}, obj, {id: this.id}))
    }

    return fetch(set_tile_url, options)
      .then(resp => resp.json())
  }
}

module.exports = { MatrixManager }
