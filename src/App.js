// import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

class CoolButton extends React.Component {
  render() {
    return (
      <button id="wrapper" className={this.props.className} onClick={this.props.onClick}>
        I'm Cool {this.props.counter}
      </button>
    );
  }
}

const StyledCoolButton = styled(CoolButton)`
  color: red;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <StyledCoolButton
          counter={this.state.counter}
          onClick={() => {
            this.setState({
              counter: this.state.counter + 1,
            });
          }}
        >
          {this.state.counter}
        </StyledCoolButton>
      </div>
    );
  }
}

export default App;
