const fetch = require('node-fetch');

class MatrixManager {
	constructor(id){
		this.api_url = "http://localhost:3000"
		this.id = id
	}

	get_tile(object){
		// Tested, working
		let get_tile_url = `${this.api_url}/get-tile?x=${object["x"]}&y=${object["y"]}`
		return fetch(get_tile_url)
			.then(resp => resp.json())
	}

  get_rect(start_obj, end_obj){
		// Endpoint not setup yet
		let get_rect_queue_url = `${this.api_url}/get-rect?x1=${start_obj["x"]}&y1=${start_obj["y"]}&x2=${end_obj["y"]}&y2=${end_obj["y"]}`
		return fetch(get_rect_queue_url)
			.then(resp => resp.json())
	}

  get_queue(){
		// Tested, working
		let get_queue_url = `${this.api_url}/get-queue`
		return fetch(get_queue_url)
			.then(resp => resp.json())
	}

  clear_queue(){
		// Tested, working
		let clear_queue_url = `${this.api_url}/clear-queue`
		return fetch(clear_queue_url, {method: 'delete'})
			.then(resp => resp.json())
	}


  set_tile(obj){
		// Tested, working
		let set_tile_url = `${this.api_url}/set-tile`

		let options = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(obj)
		}

		return fetch(set_tile_url, options)
			.then(resp => resp.json())
	}
}

module.exports = { MatrixManager }
