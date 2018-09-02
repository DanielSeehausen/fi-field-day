const modal = document.getElementById("help-modal")
const button = document.getElementById("help-button")

let modalOpen = false

function showModal() {
  modal.style.opacity = .75
  modal.style.zIndex = 10
  modal.focus()
  modalOpen = true
}

function hideModal() {
  modal.style.opacity = 0
  modal.style.zIndex = -1
  modalOpen = false
}

function onButtonClick() {
  modalOpen ? hideModal() : showModal()
}

button.onclick = onButtonClick
modal.onblur = hideModal
