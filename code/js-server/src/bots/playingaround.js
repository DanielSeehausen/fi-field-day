const DIR = [[0, -1], [0, 1], [1, 0], [-1, 0]]
const curr = [[249, 249],[249, 249],[249, 249],[249, 249]]

for (let n = 0; n < 200; n++) {
  curr.forEach((loc, idx) => {
    const x = loc[0] + DIR[idx][0]
    const y = loc[1] + DIR[idx][1]
    set({x, y}, '3d3')
  })
}
