import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './home';
import Dynamic from './dynamic';
import { UserProvider } from './context';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div className="appMain">
          <Switch >
            <UserProvider>
              <Route exact path="/" component={Home} />
              <Route exact path="/:id" component={Dynamic} />
            </UserProvider>
          </Switch >
        </div>
      </HashRouter>
    );
  }
}

export default App;
