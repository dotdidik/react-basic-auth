import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './AppRouter'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AppRouter />
        </Router>
      </div>
    );
  }
}

export default App;
