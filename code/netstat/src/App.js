import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Chart from './components/Chart.js'
import FetchData from './components/FetchData.js'



class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <div>
          <h1 className="header-text">NETSTAT</h1>
          <p className="header-text">LIVE UPDATES FROM theAPI.link</p>
        </div>
        <div className="chart-container"><Chart /></div>
      </div>
    );
  }
}

export default App;
