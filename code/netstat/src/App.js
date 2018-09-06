import React, { Component } from 'react';
<<<<<<< HEAD
import './App.css';

import { connect } from 'react-redux'

import Chart from './components/Chart.js'

class App extends Component {

=======
import logo from './logo.svg';
import './App.css';

import Chart from './components/Chart.js'

class App extends Component {
>>>>>>> origin/master
  render() {
    return (
      <div className="App">
        <div>
<<<<<<< HEAD
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
=======
          <h1 className="header-text">NETSTATS</h1>
          <p className="header-text">LIVE UPDATES FROM theAPI.LINK</p>
        </div>
        <div className="chart-container"><Chart /></div>
>>>>>>> origin/master
      </div>
    );
  }
}

<<<<<<< HEAD


const mapStateToProps = state => {
  return {totalWrites: state.totalWrites, wsConns: state.wsConns, fetching:state.fetching}
}

export default connect(mapStateToProps)(App);
=======
export default App;
>>>>>>> origin/master
