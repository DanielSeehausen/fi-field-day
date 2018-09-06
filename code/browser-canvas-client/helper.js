const modal = document.getElementById("help-modal")
const openButton = document.getElementById("help-button")
const closeButton = document.getElementById("close-help-modal-button")

let modalOpen = false

function showModal() {
  modal.style.opacity = .75
  modal.style.zIndex = 10
  modal.focus()
  modalOpen = true

  openButton.style.opacity = 0
  openButton.style.zIndex = -1
}

function hideModal() {
  modal.style.opacity = 0
  modal.style.zIndex = -1
  modalOpen = false

  openButton.style.opacity = .5
  openButton.style.zIndex = 10
}

function toggleModal() {
  modalOpen ? hideModal() : showModal()
}

openButton.onclick = toggleModal
closeButton.onclick = toggleModal
// modal.onblur = hideModal
