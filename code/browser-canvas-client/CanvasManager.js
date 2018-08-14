class CanvasManager{

  constructor(){
    this.zoomer = document.getElementById(`zoomer`)
    this.zoomStatus = document.getElementById(`zoomStatus`)
  }

  cycleZoom(){
    switch (this.zoomer.style.transform) {
      case `scale(7, 7)`:
        this.zoomer.style.transform = `scale(14, 14)`
        this.zoomStatus.innerText = `Current Zoom: x2`
        break;
      case `scale(14, 14)`:
        this.zoomer.style.transform = `scale(28, 28)`
        this.zoomStatus.innerText = `Current Zoom: x4`
        break;
      case `scale(28, 28)`:
        this.zoomer.style.transform = `scale(7, 7)`
        this.zoomStatus.innerText = `Current Zoom: x1`
        break;
      default:
      this.zoomer.style.transform = `scale(7, 7)`
      this.zoomStatus.innerText = `Current Zoom: x1`
    }
  }

}
