import React, { Component } from 'react'
import SenhaDataService from '../services/senha.service'
import notify from '../assets/notify.wav'
import logo from '../assets/logo.png'

export default class PainelSenha extends Component {
  constructor(props) {
    super(props)
    this.pegaSenhas = this.pegaSenhas.bind(this)
    this.ordem = this.ordem.bind(this)
    this.ler = this.ler.bind(this)

    this.state = {
      senhas:[],
      currentSenha: null,
      currentIndexSenha: -1,
      sigla: "",
      numero: "",
      local: "",
      guiche: "",
      paciente: "",      
      ordem: 0
    } 
  }

  componentDidMount() {
    this.timerID = setInterval(      
      () => this.pegaSenhas(),2000
    )
    this.timerID = setInterval(      
      () => this.ordem(),500
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

  ler() {
    this.speaker = new SpeechSynthesisUtterance();
    this.speaker.lang = 'pt-BR';
    this.speaker.rate = 0.68;
    this.speaker.text = 'Senha!.!.!' + '!.!.!' + this.state.sigla + '!.!.!' + this.state.numero + '!.!.!.!.!.!.!.!.!.!.!.!'+ this.state.paciente + '!!!' +  this.state.guiche;
    speechSynthesis.cancel();
    speechSynthesis.speak(this.speaker);
  }

  ordem() {

    if (this.state.senhas.length > 0) {
      const senhasOrdem = this.state.senhas.sort(function(a, b){return  b.ordem - a.ordem})
      
      const ultimoRegistro = senhasOrdem.slice(0,1)
    

      if (ultimoRegistro[0].ordem > this.state.ordem) {
        
        this.setState({              
            sigla: ultimoRegistro[0].sigla,
            numero: ultimoRegistro[0].numero,
            paciente: ultimoRegistro[0].paciente,
            guiche: ultimoRegistro[0].guiche
        }) 
    
        this.ler()
        this.setState({
          ordem: ultimoRegistro[0].ordem     
        })
      }
    }
  }




  audio = new Audio(notify)

  togglePlay = () => {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio.play() : this.audio.pause();
      })
  }

  render() {

    const { senhas } = this.state

    let filtro = (senhas).filter((item) => {
      return (item.status === "Rechamada" || item.status === "Chamada"  )
    })
    let ordem = filtro.sort(function(a, b){return  b.ordem - a.ordem})
  
    let ultimas = ordem.slice(1,4)
    let ultima = ordem.slice(0,1)
    

    let mostrarUltima = 
    <div className="list-group">
     { ultima && ultima.map((senha, index) => (
          <div className="primeira" 
              key={index} > 
            <div> SENHA {senha.sigla}{senha.numero}  <span> - </span>
             {senha.paciente}  </div>
            <div style={{display: 'flex', justifyContent: 'center'}}> <h1>RECEPÇÃO: {senha.guiche}</h1></div>                              
          </div>
      ))}
      </div>
  
    let mostrarSenha = 
      <div className="list-group">
     { ultimas && ultimas.map((senha, index) => (
          <div className="painel" 
              key={index} > 
             <div> SENHA {senha.sigla}{senha.numero}  <span> - </span>
             {senha.paciente}  </div>
            <div style={{display: 'flex', justifyContent: 'center'}}> <h1>RECEPÇÃO: {senha.guiche}</h1></div>                              
                                                                     
          </div>
      ))}
      </div>
     
  
    return (
      <div>   
        <div className="topo">
          <h1> Clínica Imagem - Painel Recepção</h1>
          <img src={logo} alt="Belford Roxo" />
        </div> 
        {mostrarUltima}
        {mostrarSenha}     
      </div>
    )
  }
}
  

 