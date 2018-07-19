import React, { Component } from 'react'
import GridRow from './GridRow'
import config from '../config.js'
import initWS from '../conn/wsInit.js'

const DEFAULTMATRIX = (() => {
  const matrix = Array(config.ROWCOUNT)
  for (let rowIdx = 0; rowIdx < config.ROWCOUNT; rowIdx++)
    matrix[rowIdx] = Array(config.COLCOUNT).fill(config.DEFAULTCOLOR)
  return matrix
})()

 class Matrix extends Component {

  constructor() {
    super()
    this.state = {
      matrix: DEFAULTMATRIX
    }
    initWS() // kicks off the websocket. instead of components and v-dom holding state on cell colors, going to alter dom styling directly. for speed but is naughty to do with react.
  }

  getRows = () => this.state.matrix.map((row, rowIdx) => (
    <GridRow key={rowIdx} rowIdx={rowIdx} cellVals={row}/>
  ))

  render() {
    return (
      <div id="matrix">
        { this.getRows() }
      </div>
    )
  }
}

export default Matrix
