const isHex = str => /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(str)

const validColor = req => {
  const str = req.query.c || ''
  return (str.length === 6) ? isHex(str) : false
}

module.exports = validColor
