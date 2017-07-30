import './App.css';

import React, {Component} from 'react';

import logo from './logo.svg';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list
    };
  }

  onDismiss(id) {
    console.log('onDismiss', id)
    const isNotId = item => item.objectID !== id;
    const updatedList = this
      .state
      .list
      .filter(isNotId);
    this.setState({list: updatedList});
  }

  onDismiss2 = () => {
    console.log('onDismiss2', this.state.list[0])
  }

  render() {
    const header = "Welcome to the Road to learn React 7";
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>{header}</h2>
        </div>
        <div className="App-list">
          <form>
            <input type="text"/>
          </form>
          {this
            .state
            .list
            .map(item => {
              return (
                <div key={item.objectID}>
                  <span>
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span>{item.author}</span>
                  <span>{item.num_comments}</span>
                  <span>{item.points}</span>
                  <span>
                    <button onClick={() => this.onDismiss(item.objectID)} type="button">
                      Dismiss
                    </button>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
