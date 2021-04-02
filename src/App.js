import './App.css';
import React, { useEffect, useState } from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
    };
  }

  render() {
    return (
      <div style={{ textAlign: 'center', width: '100%', paddingTop: '100px' }}>
        <div>{this.state.running ? 'Running' : 'Idle'}</div>
        <button
          style={{
            backgroundColor: this.state.running ? 'blue' : 'red',
          }}
          onClick={() => {
            this.setState({
              running: !this.state.running,
            });
          }}
        >
          Start
        </button>
      </div>
    );
  }
}

export default App;
