import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

<<<<<<< HEAD
import { FetchNetstatData } from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Axes from './Axes'
import Bars from './Bars'

class Chart extends Component {
=======

import Axes from './Axes'
import Bars from './Bars'
import data from './Data'

export default class Chart extends Component {
>>>>>>> origin/master
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

<<<<<<< HEAD
  // shouldComponentUpdate = () => {
  //   return !this.props.fetching
  // }

  componentDidMount = () => {
    // this.props.FetchNetstatData()
    setInterval(this.props.FetchNetstatData, 1000);
  }

=======
>>>>>>> origin/master
  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: 800, height: 500 }

<<<<<<< HEAD
    const maxValue = Math.max(...Object.values(this.props.groupStatsByID).map(d => d.writes))

    const xScale = this.xScale
      .padding(0.5)
      .domain(Object.keys(this.props.groupStatsByID).map(d => `Group ${parseInt(d)}`))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
=======
    const maxValue = Math.max(...data.map(d => d.hits))

    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(d => d.title))
      .range([margins.left, svgDimensions.width - margins.right])

     // scaleLinear type
    const yScale = this.yScale
       // scaleLinear domain required at least two values, min and max
>>>>>>> origin/master
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
         scales={{ xScale, yScale }}
         margins={margins}
         svgDimensions={svgDimensions}
       />

<<<<<<< HEAD
     { Object.keys(this.props.groupStatsByID).length !== 0 &&
       <Bars
         scales={{ xScale, yScale }}
         margins={margins}
         data={Object.values(this.props.groupStatsByID)}
         maxValue={maxValue}
         svgDimensions={svgDimensions}
       />
   }
=======
       <Bars
         scales={{ xScale, yScale }}
         margins={margins}
         data={data}
         maxValue={maxValue}
         svgDimensions={svgDimensions}
       />
>>>>>>> origin/master
      </svg>
    )
  }
}
<<<<<<< HEAD

const mapStateToProps = state => {
  return {totalWrites: state.totalWrites, wsConns: state.wsConns, groupStatsByID: state.groupStatsByID, fetching:state.fetching}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    FetchNetstatData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
=======
>>>>>>> origin/master
