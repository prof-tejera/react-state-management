import React from 'react';

class Countdown extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            // update state internally, do timer logic
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            // start timer, create an interval, etc
          }}
        >
          Start
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countdownStarted: false,
    };
  }

  render() {
    return (
      <div>
        <div>Countdown is started: {this.state.countdownStarted}</div>
        <Countdown />
      </div>
    );
  }
}

export default App;
