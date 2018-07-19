import config from '../config.js'

function send(x, y, c, id=config.GROUPID) {
  console.log( `/setTile?x=${x}&y=${y}&c=${c}&id=${id}`);
  fetch(config.HTTPENDPOINT + `/setTile?x=${x}&y=${y}&c=${c.slice(1)}&id=${id}`, {
    method: 'Post',
    mode: 'no-cors',
  })
  .then(response => response)
  .then(x => { console.log(x) })
}

export default send
