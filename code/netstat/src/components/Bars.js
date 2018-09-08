import React, { Component } from 'react'

import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['rgba(255, 196, 61, 1)', 'rgba(239, 71, 111, 1)'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, svgDimensions, data } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    let counter = 1
    const bars = data.map(datum => (
      <rect
        key={counter}
        x={xScale(`Group ${counter++}`)}
        y={yScale(datum.writes)}
        height={height - margins.bottom - scales.yScale(datum.writes)}
        width={xScale.bandwidth()}
        fill={this.colorScale(datum.writes)}
      />
    ))

    return <g>{bars}</g>
  }
}

export default Bars
