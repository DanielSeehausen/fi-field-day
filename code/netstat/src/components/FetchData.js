import React, { Component } from 'react'

export default class FetchData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groupStatsByID: {},
      totalWrites: 0,
      wsConns: 0
    }
  }

  componentDidMount = () => {
    this.getGroupWritesById()
  }

  getGroupWritesById = () => {
    fetch('http://theapi.link/netstat')
      .then(res => res.json())
      .then(data => {
        console.log(data)

        this.setState(
          {
            groupStatsByID: data.groupStatsByID,
            totalWrites: data.totalWrites,
            wsConns: data.wsConns
          },
          () => console.log(this.state)
        )
      })
  }

  render() {
    return <div>HEY</div>
  }
}
