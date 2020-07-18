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
    this.timerID = setInterval(
      
    () => this.pegaSenhas(),2000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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

    const { senhas } = this.state

    let filtro = (senhas).filter((item) => {
      return (item.status === "Rechamada" || item.status === "Chamada"  )
    })
    let ordem = filtro.sort(function(a, b){return  b.ordem - a.ordem})
    console.log("Ordem",ordem)
    let ultimas = ordem.slice(0,4)
   console.log("Ultimas",ultimas)
  
    let mostrarSenha = 
      <div className="list-group">
     { ultimas && ultimas.map((senha, index) => (
          <div className="painel" 
              key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
              SENHA {senha.numero} -
              {senha.paciente} - 
              {senha.local}  -
              {senha.ordem}                                 
          </div>
      ))}
      </div>
     
  
    return (
      <div>       
        {mostrarSenha}     
      </div>
    )
  }
}
  

 