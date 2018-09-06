import React, { Component } from 'react'

import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'


class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#818ffd', '#1e6ca4'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, svgDimensions, data } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.group}
          x={xScale(`Group ${datum.group}`)}
          y={yScale(datum.writes)}
          height={height - margins.bottom - scales.yScale(datum.writes)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.writes)}
          />
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}


export default Bars
