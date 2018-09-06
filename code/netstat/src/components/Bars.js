import React, { Component } from 'react'
<<<<<<< HEAD

import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'


class Bars extends Component {
=======
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
>>>>>>> origin/master
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
<<<<<<< HEAD
      .range(['#818ffd', '#1e6ca4'])
=======
      .range(['#F3E5F5', '#7B1FA2'])
>>>>>>> origin/master
      .interpolate(interpolateLab)
  }

  render() {
<<<<<<< HEAD
    const { scales, margins, svgDimensions, data } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    let counter = 1;
    const bars = (
      data.map(datum =>
        <rect
          key={datum.group}
          x={xScale(`Group ${counter++}`)}
          y={yScale(datum.writes)}
          height={height - margins.bottom - scales.yScale(datum.writes)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.writes)}
          />
      )
    )
    
=======
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.title}
          x={xScale(datum.title)}
          y={yScale(datum.hits)}
          height={height - margins.bottom - scales.yScale(datum.hits)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.hits)}
        />,
      )
    )

>>>>>>> origin/master
    return (
      <g>{bars}</g>
    )
  }
}
<<<<<<< HEAD


export default Bars
=======
>>>>>>> origin/master
