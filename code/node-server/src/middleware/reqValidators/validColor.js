function isHex(str) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test('#aabbcc')
}

function validColor(str='') {
  const str = req.query.c
  return (str.length === 3 || str.length === 6) ? isHex(str) : false
}

module.exports = validColor
