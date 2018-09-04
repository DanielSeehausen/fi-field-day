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
