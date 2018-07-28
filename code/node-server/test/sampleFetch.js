// const fetch = require('node-fetch')
// const BASE = 'http://localhost:3000'
// 
// function getBoard(id) {
//   fetch(BASE + `/getBoard?id=${id}`, {
//     method: 'GET' // *GET, POST, PUT, DELETE, etc.
//   })
//   .then(response => response.json())
//   .then(x => console.log(x))
// }
// 
// function setTile(x, y, c, id) {
//   fetch(BASE + `/setTile?x=${x}&y=${y}&c=${c}&id=${id}`, {
//     method: 'Post',
//     mode: 'no-cors',
//   })
//   .then(response => response)
//   .then(x => { console.log(x.headers) })
// }
// 
// function getTile(x, y) {
//   fetch(BASE + `/getTile?x=${x}&y=${y}`, {
//     method: 'GET',
//     mode: 'no-cors',
//   })
//   .then(response => response)
//   .then(x => { console.log(x.headers.get("color")) })
// }
// 
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
// 
// // getTile(1, 1)
// setTile(1, 1, '333', 33)
// // getBoard(33)
// //
