import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import { FetchNetstatData } from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Axes from './Axes'
import Bars from './Bars'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  // shouldComponentUpdate = () => {
  //   return !this.props.fetching
  // }

  componentDidMount = () => {
    // this.props.FetchNetstatData()
    setInterval(this.props.FetchNetstatData, 1200)
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 500 }

    const maxValue = Math.max(...Object.values(this.props.groupStatsByID).map(d => d.writes))

    const xScale = this.xScale
      .padding(0.5)
      .domain(Object.keys(this.props.groupStatsByID).map(d => `Group ${parseInt(d)}`))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale.domain([0, maxValue]).range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes scales={{ xScale, yScale }} margins={margins} svgDimensions={svgDimensions} />

        {Object.keys(this.props.groupStatsByID).length !== 0 && (
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={Object.values(this.props.groupStatsByID)}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        )}
      </svg>
    )
  }
}

const mapStateToProps = ({ totalWrites, wsConns, groupStatsByID, fetching }) => ({
  totalWrites,
  wsConns,
  groupStatsByID,
  fetching
})

const mapDispatchToProps = dispatch => bindActionCreators({ FetchNetstatData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
