import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import PainelSenha from './components/chamada.component'
import PainelExame from './components/chamada-exame.component'

class App extends Component  {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/painel/" component={PainelSenha} />
            <Route exact path="/painelexame/" component={PainelExame} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
