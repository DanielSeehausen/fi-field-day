const BASE = 'http://localhost:3000'

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');

function getBoard(id='0') {
  fetch(BASE + `/board?id=${id}`, {
    method: 'GET',
  })
  .then(response => response.arrayBuffer()).then(function(buffer) {
    console.log(buffer);
    x = new Uint8ClampedArray(buffer)
    // buffer = new Uint8ClampedArray(buffer, 28, 4)
    // data = new ImageData(buffer, 1, 1)
    // ctx.putImageData(data, 0, 0)
  });
}

// var imageData = context.getImageData(x, y, w, h);
// var array = imageData.data; // array is a Uint8ClampedArray
// var buffer = imageData.data.buffer; // buffer is a ArrayBuffer
// 
// // incomingBuffer is a TypedArray
// var imageData2 = context.createImageData(w, h);
// imageData2.data.set(incomingBuffer);

// function setTile(x, y, c='#FF0000', id='0') {
//   fetch(BASE + `/tile?x=${x}&y=${y}&c=${c}&id=${id}`, {
//     method: 'Post',
//     mode: 'no-cors',
//   })
//   .then(response => response)
//   .then(x => { console.log(x.headers) })
// }

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
