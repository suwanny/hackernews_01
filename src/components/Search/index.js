// functional stateless component
import React, {Component}  from 'react';

// const Search = ({value, onChange, onSubmit, children}) => <form onSubmit={onSubmit}>
class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

export default Search;
