import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Chart from './components/Chart.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1 className="header-text">NETSTATS</h1>
          <p className="header-text">LIVE UPDATES FROM theAPI.LINK</p>
        </div>
        <div className="chart-container"><Chart /></div>
      </div>
    );
  }
}

export default App;
