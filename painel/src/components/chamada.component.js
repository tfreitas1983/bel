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

    //const { senhas, numero, local, currentSenha,currentIndexSenha} = this.state

    let filtro = (this.state.senhas).filter((item) => {
      return (item.status === "Rechamada" || item.status === "Chamada"  )
    })

    let ultimas = filtro.slice(-4)

    let ultima = ultimas.slice(-1)
    console.log("Ultima", ultima)

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
        
        <div className="list-group">       
          <div className="painel" style={{display: 'flex', justifyContent: 'space-between', background: '#aaaaff'}}> 
              { ultima.map(item => (
                <div>
                  <h4>SENHA {item.numero} </h4>
                  <h4> {item.paciente} </h4>
                  <h4> {item.local} </h4>  
                </div>
              ))}
          </div>  
        </div>   
        {mostrarSenha}     
      </div>
    )
  }
}
  

 