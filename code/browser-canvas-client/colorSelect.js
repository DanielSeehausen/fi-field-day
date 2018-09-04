const colorPicker = document.getElementById('colorPicker')
const pick = document.getElementById('pick')
const paint = document.getElementById('paint')
const canvasDiv = document.getElementById('canvas')


pick.addEventListener('click', () =>{
  document.body.style.cursor = 'url("assets/eyedropper.png"), auto'
})

paint.addEventListener('click', () =>{
  document.body.style.cursor = 'url("assets/paintbrush.png"), auto'
})
