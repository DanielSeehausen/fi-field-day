import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import Chart from './components/Chart.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <h1 className="header-text">NETSTAT</h1>
          <p className="header-text">LIVE UPDATES FROM theAPI.link</p>
        </div>

        <div className="flex justify-center stats-boxes">
          <div className="stat-box col border p1 mr3">
            <p>Writes to theAPI.link</p>
            {this.props.totalWrites}
          </div>
          <div className="stat-box col border p1 ml3">
            <p>Sockets Connected</p>
            {this.props.wsConns}
          </div>
        </div>

        <div className="chart-container">
          <Chart />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ totalWrites, wsConns, fetching }) => ({
  totalWrites,
  wsConns,
  fetching
})

export default connect(mapStateToProps)(App)
