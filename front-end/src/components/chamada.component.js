import React, { Component } from 'react'
import SenhaDataService from '../services/senha.service'

export default class PainelSenha extends Component {
  constructor(props) {
    super(props)
    this.pegaSenhas = this.pegaSenhas.bind(this)

    this.state = {
      senhas:[],
      currentSenha: null,
      currentIndexSenha: -1,
      numero: "",
      local: "",
      paciente: ""
    } 
  }

  componentDidMount() {
   this.pegaSenhas()  
  }

  pegaSenhas() {        
    SenhaDataService.buscarTodos()
    .then(response => {
        this.setState({
            senhas: response.data.docs
        })            
    })
    .catch(e => {
        console.log(e)
    })
}


  render() {

    const { senhas, numero, local, currentSenha,currentIndexSenha} = this.state

    let filtro = (this.state.senhas).filter((item) => {
      return item.status === "Chamada"
    })

    let ultimas = filtro.slice(-4)
    
    let mostrarSenha = 
      <div className="list-group">
     { ultimas && ultimas.map((senha, index) => (
          <div className="painel" 
              key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
              SENHA {senha.numero} -
              {senha.paciente} - 
              {senha.local}                                   
          </div>
      ))}
      </div>
  
    return (
      <div>
        {mostrarSenha}
      </div>
    );
  }
}
  

 