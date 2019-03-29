import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { LineChart, Line } from 'recharts';

class TrafficSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []}
    }

    
    componentDidMount() {
        fetch("http://localhost:8080/api/traffic?period=240")
            .then(res => res.json())
            .then(
                  (result) => {
                      this.setState({
                          isLoaded: true,
                          data: result.data
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded: true,
                          error: error});
             }
            )
    }

    render() { return (
              <LineChart width={400} height={400} data={this.state.data} className='chart'>
                <Line type="monotone" dataKey="debit" stroke="#8884d8" />
              </LineChart>
    );
  }
}

class App extends Component {
  render() { return <TrafficSeries></TrafficSeries> }
}

export default App;
