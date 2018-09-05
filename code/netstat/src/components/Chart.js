import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import { FetchNetstatData } from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Axes from './Axes'
import Bars from './Bars'
import data from './Data'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  componentDidMount = () => {
    this.props.FetchNetstatData()
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 500 }

    const maxValue = Math.max(...Object.values(this.props.groupStatsByID).map(d => d.writes))

    const xScale = this.xScale
      .padding(0.5)
      .domain(Object.keys(this.props.groupStatsByID).map(d => `Group ${d}`))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
         scales={{ xScale, yScale }}
         margins={margins}
         svgDimensions={svgDimensions}
       />

       <Bars
         scales={{ xScale, yScale }}
         margins={margins}
         data={this.props.groupStatsByID}
         maxValue={maxValue}
         svgDimensions={svgDimensions}
       />
      </svg>
    )
  }
}

const mapStateToProps = state => {
  return {totalWrites: state.totalWrites, wsConns: state.wsConns, groupStatsByID: state.groupStatsByID}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    FetchNetstatData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
