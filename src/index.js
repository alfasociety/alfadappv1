import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';

import './style.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Home} exact path="/" />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
