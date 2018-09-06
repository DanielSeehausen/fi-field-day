const { MatrixManager } = require('./MatrixManager.js')

var teamID = 2

const matrix = new MatrixManager(teamID)

// for(let x = 301; x < 400; x++) {
//   for(let y = 301; y < 400; y++) {
//
//     setTimeout(function(){
//       console.log("Executing", x, y)
//       if(x%2==0){
//         if(y%2==0){
//           matrix.setTile({x: x, y: y, c:"ffff00"})
//         }else{
//           matrix.setTile({x: x, y: y, c:"48f442"})
//         }
//       }else{
//         if(y%2==0){
//           matrix.setTile({x: x, y: y, c:"48f442"})
//         }else{
//           matrix.setTile({x: x, y: y, c:"ffff00"})
//         }
//       }
//     }, 1000);
//
//   }
// }


for(let i = 0; i < 500; i++){
  var randx = Math.floor(Math.random() * i) + 1
  var randy = Math.floor(Math.random() * i) + 1
  matrix.setTile({x: randx, y: randy, c:"48f442"})
}



matrix.getBoard()
  .then(console.log)
