const colorPicker = document.getElementById('colorPicker')
const pick = document.getElementById('pick')
const paint = document.getElementById('paint')
let hexColor = "#000000"
let colorForm = document.getElementById('colorForm')
let hex = document.getElementById('hex')

colorForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(hex.value[0] !== "#"){
    hex.value = "#" + hex.value
  }
  colorPicker.style.backgroundColor = hex.value
  colorPicker.style.outlineColor = invertColor(hex.value)
  hexColor = hex.value
  // console.log(hex.value)
})

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function selectColor(colorInfo) {
   let oppositeColor= rgbToHex(256 - colorInfo.r, 256 - colorInfo.g, 256 - colorInfo.b)
   hexColor = rgbToHex(colorInfo.r,colorInfo.g,colorInfo.b)
   colorPicker.style.backgroundColor = hexColor
   colorPicker.style.outlineColor = oppositeColor
  resetPointer()
}

function resetPointer(e){
    document.body.style.cursor = "auto"
}

function getCursorPosition(e) {
    let rect = canvas.canvas.getBoundingClientRect();
    let x = (e.clientX / canvasManager.zoomMultiplier(canvasManager.zoom) - (rect.left / canvasManager.zoomMultiplier(canvasManager.zoom)));
    let y = (e.clientY / canvasManager.zoomMultiplier(canvasManager.zoom) - (rect.top / canvasManager.zoomMultiplier(canvasManager.zoom)));
    return {x: x, y: y}
}

function getColor(coords) {
  let data = canvas.canvas.getContext('2d').getImageData(coords.x, coords.y, 1, 1).data
  return {r: data[0], g: data[1], b: data[2]}
}

function applyColor(coords) {
  httpConn.setTile(coords.x, coords.y, hexColor.slice(1))
  // resetPointer()
}

function handleClick(e){
  let coords = getCursorPosition(e)
  let colorInfo = getColor(coords)
  if (e.target.id == "pick"){
    e.preventDefault()
    document.body.style.cursor = 'url("assets/eyedropper.png"), auto'
  }
  else if (e.target.id == "paint"){
    e.preventDefault()
    document.body.style.cursor = 'url("assets/paintbrush.png"), auto'
  }
  else if (document.body.style.cursor == 'url("assets/eyedropper.png"), auto') {
    selectColor(colorInfo)
  }
  else if (document.body.style.cursor == 'url("assets/paintbrush.png"), auto') {
    applyColor(coords)
  }
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}



// function handleClicks(e) {
//   console.log(e.target.id)
//
//   } else if (document.body.style.cursor == 'url("assets/paintbrush.png"), auto') {
//     console.log("hi")
//     resetPointer(e)
//   }
// }

// handle click identifies event.target.id
// if/then calls different functions that handle logic
