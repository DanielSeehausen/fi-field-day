class CanvasManager{

  constructor(){
    this.zoomer = document.getElementById("zoomer")
    this.zoomOutput = document.getElementById("zoomSliderOutput")
  }

  handleZoom(e){
    this.zoomOutput.value = (e.target.value)
    this.zoomer.style.transform = `scale(${e.target.value/100}, ${e.target.value/100})`
  }

  cycleZoom(){
    switch (this.zoomer.style.transform) {
      case "scale(3, 3)":
        this.zoomer.style.transform = `scale(5, 5)`
        break;
      case "scale(5, 5)":
        this.zoomer.style.transform = `scale(7, 7)`
        break;
      case "scale(7, 7)":
        this.zoomer.style.transform = `scale(3, 3)`
        break;
      default:
      this.zoomer.style.transform = `scale(5, 5)`
    }
  }

}
