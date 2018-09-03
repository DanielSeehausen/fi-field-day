const modal = document.getElementById("help-modal")
const button = document.getElementById("help-button")

let modalOpen = false

function showModal() {
  modal.style.opacity = .75
  modal.style.zIndex = 10
  modal.focus()
  modalOpen = true
  
  button.style.opacity = 0
  button.style.zIndex = -1
}

function hideModal() {
  modal.style.opacity = 0
  modal.style.zIndex = -1
  modalOpen = false
  
  button.style.opacity = .5
  button.style.zIndex = 10
}

function onButtonClick() {
  modalOpen ? hideModal() : showModal()
}

button.onclick = onButtonClick
modal.onblur = hideModal

// /********************* Instruction Pane Handler ***************************************/
// 
// const questionMark = document.getElementById('questionMark')
// const instructions = document.getElementsByClassName('instructionsHidden')[0]
// questionMark.addEventListener('click', (e) => {
//   instructions.className = "instructions fixed bottom-0 left-0 right-0 mr2 right"
//   questionMark.className = "questionMarkHidden right mr2"
// })
// 
// const close = document.getElementById('close')
// close.addEventListener('click', (e) =>{
//   instructions.className = "instructionsHidden fixed bottom-0 left-0 right-0 mr2 right"
//   questionMark.className = "questionMark right mr2"
// }){{}}
