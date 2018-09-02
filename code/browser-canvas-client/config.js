const config = {
  DEFAULTLENGTH: 500,
  DEFAULTARRAY: null,
  HTTPENDPOINT: 'http://localhost:3000',
  WSENDPOINT: 'ws://localhost:8080',
  ID: 0 //preassigned group ids
}

config.DEFAULTARRAY = new Uint8ClampedArray(Math.pow(config.DEFAULTLENGTH, 2) * 4).fill('33')
