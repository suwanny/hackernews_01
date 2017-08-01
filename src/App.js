import './App.css';

import React, {Component} from 'react';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const isSearched = (searchTerm) => (item) => !searchTerm || item
  .title
  .toLowerCase()
  .includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  setSearchTopstories = (result) => {
    this.setState({result});
  }

  fetchSearchTopstories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  //
  onSearchSubmit = (event) => {
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this
      .state
      .result
      .hits
      .filter(isNotId);
    this.setState({
      result: {
        ...this.state.result,
        hits: updatedHits
      }
    });
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value});
    console.log('searchTerm', this.state.searchTerm)
  }

  render() {
    const {searchTerm, result} = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search :
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss}/>}
      </div>
    );
  }
}

export default App;

// functional stateless component
const Search = ({value, onChange, onSubmit, children}) => <form onSubmit={onSubmit}>
  <input type="text" value={value} onChange={onChange}/>
  <button type="submit">
    {children}
  </button>
</form>

const largeColumn = {
  width: '40%'
};

const midColumn = {
  width: '30%'
};

const smallColumn = {
  width: '10%'
};

const Table = ({list, onDismiss}) => <div className="table">
  {list.map(item => <div key={item.objectID} className="table-row">
    <span style={largeColumn}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={midColumn}>
      {item.author}
    </span>
    <span style={smallColumn}>
      {item.num_comments}
    </span>
    <span style={smallColumn}>
      {item.points}
    </span>
    <span style={smallColumn}>
      <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
        Dismiss
      </Button>
    </span>
  </div>)}
</div>

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children
    } = this.props;

    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}
