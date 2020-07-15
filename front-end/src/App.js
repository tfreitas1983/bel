import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import AdicionarPaciente from "./components/add-paciente.component.js"
import Paciente from "./components/edit-paciente.component"
import PacientesLista from './components/list-paciente.component';

import AdicionarClinica from './components/add-clinica.component';
import Clinica from './components/edit-clinica.component';
import ClinicaLista from './components/list-clinica.component';

import AdicionarSala from './components/add-sala.component';
import Sala from "./components/edit-sala.component"
import SalasLista from './components/list-sala.component';

import AdicionarGuiche from './components/add-guiche.component';
import Guiche from "./components/edit-guiche.component"
import GuichesLista from './components/list-guiche.component';


import AdicionarPainel from './components/add-painel.component';
import Painel from "./components/edit-painel.component"
import PainelLista from './components/list-painel.component';

import Cadastros from './components/cadastro.component';
import Senha from './components/senha.component';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
            <a href="/senhas" className="navbar-brand">Clínica</a>
            <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/senhas"} className="nav-link">
                  Senhas
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/pacientes"} className="nav-link">
                  Pacientes
                </Link>
              </li>              

              <li className="dropdown"> 
                <span className="dropbtn">
                  <Link to={"/cadastros"}>
                    Cadastros
                  </Link>
                </span>               
                <div className="dropdown-content"> 
                  <span>
                    <Link to={"/cadastros/salas"}>
                      Salas
                    </Link>
                  </span>
                  <span>                
                    <Link to={"/cadastros/guiches"}>
                      Guichês
                    </Link>
                  </span>
                  <span>                
                    <Link to={"/cadastros/painel"}>
                      Painel
                    </Link>
                  </span>
                  <span>                
                    <Link to={"/cadastros/clinica"}>
                      Clínica
                    </Link>
                  </span>
                </div>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/pacientes"} component={PacientesLista} />
              <Route exact path="/pacientes/adicionar" component={AdicionarPaciente} />
              <Route path="/pacientes/:id" component={Paciente} />

              <Route exact path="/cadastros" component={Cadastros} />
              <Route exact path="/senhas" component={Senha} />

              <Route exact path="/cadastros/clinica" component={ClinicaLista} />
              <Route exact path="/cadastros/clinica/adicionar" component={AdicionarClinica} />
              <Route exact path="/cadastros/clinica/:id" component={Clinica} />

              <Route exact path="/cadastros/salas" component={SalasLista} />
              <Route exact path="/cadastros/salas/adicionar" component={AdicionarSala} />
              <Route exact path="/cadastros/salas/:id" component={Sala} />

              <Route exact path="/cadastros/guiches" component={GuichesLista} />
              <Route exact path="/cadastros/guiches/adicionar" component={AdicionarGuiche} />
              <Route exact path="/cadastros/guiches/:id" component={Guiche} />

              <Route exact path="/cadastros/painel" component={PainelLista} />
              <Route exact path="/cadastros/painel/adicionar" component={AdicionarPainel} />
              <Route exact path="/cadastros/painel/:id" component={Painel} />              
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;