import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { token } from './config';

class Input extends React.Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          value={this.props.value}
          onChange={e => {
            this.props.onChange(e.target.value);
          }}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    // Now we have full control because we're managing state up here
    console.log('username', this.state.username, 'password', this.state.password);
    return (
      <div>
        <Input label="username" onChange={username => this.setState({ username })} />
        <Input label="password" onChange={password => this.setState({ password })} />
      </div>
    );
  }
}

export default App;
