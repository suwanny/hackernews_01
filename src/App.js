import './App.css';

import React, {Component} from 'react';

import logo from './logo.svg';

class App extends Component {
  render() {
    const header = "Welcome to the Road to learn React 4";
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>{header}</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
