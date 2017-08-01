import './App.css';

import React, {Component} from 'react';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const isSearched = (searchTerm) => (item) => !searchTerm || item
  .title
  .toLowerCase()
  .includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };
  }

  setSearchTopstories = (result) => {
    // this.setState({result});
    const {hits, page} = result;
    const {searchKey, results} = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    });
  }

  fetchSearchTopstories = (searchTerm, page) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    // this.fetchSearchTopstories(searchTerm);
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  //
  onSearchSubmit = (event) => {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    // this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    if (this.needsToSearchTopstories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  onDismiss = (id) => {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    });
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value});
    console.log('searchTerm', this.state.searchTerm)
  }

  needsToSearchTopstories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  render() {
    const {searchTerm, results, searchKey} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

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
        <Table list={list} onDismiss={this.onDismiss}/>
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            More
          </Button>
        </div>
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
    <span style={midColumn}>{item.author}</span>
    <span style={smallColumn}>{item.num_comments}</span>
    <span style={smallColumn}>{item.points}</span>
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
