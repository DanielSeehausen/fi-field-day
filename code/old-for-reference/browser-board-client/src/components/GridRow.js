import React from 'react';
import send from '../conn/send.js'
import config from '../config.js'

const GridRow = (props) => (
  <div className='grid-row'>
    {props.cellVals.map((val, colIdx) => {
      const str = `${props.rowIdx}-${colIdx}`
      return (
        <div
          key={str}
          id={str}
          className="grid-cell"
          style={{backgroundColor: props.color}}
          onMouseDown={() => send(props.rowIdx, colIdx, config.selectedColor)}>
        </div>
    )})}
  </div>
)

export default GridRow
