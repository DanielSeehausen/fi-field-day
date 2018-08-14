class CanvasManager{

  constructor(){
    this.zoomer = document.getElementById("zoomer")
  }

  cycleZoom(){
    switch (this.zoomer.style.transform) {
      case "scale(7, 7)":
        this.zoomer.style.transform = `scale(20, 20)`
        break;
      case "scale(20, 20)":
        this.zoomer.style.transform = `scale(40, 40)`
        break;
      case "scale(40, 40)":
        this.zoomer.style.transform = `scale(7, 7)`
        break;
      default:
      this.zoomer.style.transform = `scale(7, 7)`
    }
  }
  
}
