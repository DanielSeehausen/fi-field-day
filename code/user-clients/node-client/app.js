const { MatrixManager } = require('./MatrixManager.js')

var teamID = 1

const matrix = new MatrixManager(teamID)

matrix.getTile({x: 460, y: 460})
.then(res=>console.log(res))

for(let x = 0; x < 10; x++) {
  for(let y = 0; y < 10; y++) {
    matrix.setTile({x: x, y: y, c:"00ff00"})
  }
}

// matrix.setTile({x: 0, y: 0, c:"00ff00"})
matrix.getQueue()
.then(resp=>console.log(resp))



// matrix.setTile({x: 460, y: 460, c:"ffffff"})
// matrix.setTile({x: 455, y: 455, c:"ffffff"})
// matrix.setTile({x: 460, y: 460, c:"ffffff"})
// matrix.setTile({x: 460, y: 460, c:"ffffff"})
// matrix.setTile({x: 460, y: 460, c:"ffffff"})

// matrix.getTile({x: 460, y: 460})
// .then(res=>console.log(res))




// Write your code here!
// all functions return a promise.
