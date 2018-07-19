import '../App.css'
import React, { Component } from 'react';
import Matrix from './Matrix'
import Draggable from 'react-draggable';
import { BlockPicker } from 'react-color';
import config from '../config.js'


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      draggingDisabled: true,
      ws: null,
      color: config.selectedColor
    }
  }

  dragHandler = (e) => {
    // really no nice way to do this -- is a known issue. This mouseOver instead of onClick/mouseDown saves us from a required double click
    (e.target.tagName === "INPUT") ? this.setState({draggingDisabled: true}) : this.setState({draggingDisabled: false})
  }

  // this dragger coercing me to do really hacky bad...config acting as bad store. this.state only used for color selector image :/
  render() {
    return (
      <div className="App" >
        <Matrix />
        <Draggable disabled={this.state.draggingDisabled} defaultPosition={{x: 50, y: 50}}>
          <div id='block-picker-wrapper' onMouseOver={this.dragHandler}>
            <BlockPicker
              color={this.state.color}
              onChangeComplete={ color => {config.selectedColor = color.hex; this.setState({color: color.hex})} }
              triangle='hide'
            />
          </div>
        </Draggable>
      </div>
    )
  }
}
