import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <App/>
  </div>
  , document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module
    .hot
    .accept();
}
