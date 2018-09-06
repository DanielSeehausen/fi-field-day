import React, { Component } from 'react';
import './App.css';

// import Writes from './components/Writes.js'
import Chart from './components/Chart.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <h1 className="header-text">NETSTAT</h1>
          <p className="header-text">LIVE UPDATES FROM theAPI.link</p>
        </div>
        <div className="chart-container">
          <Chart />
        </div>
      </div>
    );
  }
}



export default App;
