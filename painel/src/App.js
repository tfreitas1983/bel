import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import PainelSenha from './components/chamada.component'

class App extends Component  {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/painel/" component={PainelSenha} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
