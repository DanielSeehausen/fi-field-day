import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'
import UUID from 'uuid'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#F3E5F5', '#7B1FA2'])
      .interpolate(interpolateLab)
  }

  getKey = () => {

  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      Object.values(data).map(datum =>
        <rect
          key={ UUID() }
          x={xScale(datum.title)}
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


// data.map(datum =>
//   <rect
//     key={datum.title}
//     x={xScale(datum.title)}
//     y={yScale(datum.hits)}
//     height={height - margins.bottom - scales.yScale(datum.hits)}
//     width={xScale.bandwidth()}
//     fill={this.colorScale(datum.hits)}
//   />,
// )
