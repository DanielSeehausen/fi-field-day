class CanvasManager{

  constructor(){
    this.zoomer = document.getElementById("zoomer")
    this.zoomOutput = document.getElementById("zoomSliderOutput")
  }

  handleZoom(e){
    this.zoomOutput.value = (e.target.value)
    this.zoomer.style.transform = `scale(${e.target.value/100}, ${e.target.value/100})`
  }

}
