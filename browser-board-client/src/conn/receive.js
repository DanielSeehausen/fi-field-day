export function setCellValue(payload) {
  const {x, y, c} = payload
  console.log(x, y, c);
  document.getElementById(`${x}-${y}`).style.backgroundColor = c
}

export function setCellValues(values) {
  values.forEach((row, x) => {
    row.forEach((c, y) => {
      setCellValue({x, y, c})
    })
  })
}
