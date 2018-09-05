const colorPicker = document.getElementById('colorPicker')
const pick = document.getElementById('pick')
const paint = document.getElementById('paint')


pick.addEventListener('click', () =>{
  document.body.style.cursor = 'url("assets/eyedropper.png"), auto'
})

paint.addEventListener('click', () =>{
  document.body.style.cursor = 'url("assets/paintbrush.png"), auto'
})

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function selectColor(colorInfo) {
  colorPicker.style.backgroundColor = rgbToHex(colorInfo.r,colorInfo.g,colorInfo.b)
}
