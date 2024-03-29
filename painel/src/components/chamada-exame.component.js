import React, { Component } from 'react'
import SenhaDataService from '../services/senha.service'
import notify from '../assets/exame.wav'
import logo from '../assets/logo.png'

export default class PainelExame extends Component {
  constructor(props) {
    super(props)
    this.pegaSenhas = this.pegaSenhas.bind(this)
    this.esperaOrdem = this.esperaOrdem.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
    this.ler = this.ler.bind(this)

    this.state = {
      senhas:[],
      currentSenha: null,
      currentIndexSenha: -1,
      sigla: "",
      numero: "",
      local: "",
      paciente: "",
      play: false,
      esperaOrdem: 0
    } 
  }

  componentDidMount() {
    this.timerID = setInterval(      
      () => this.pegaSenhas(),2000
    )
    this.timerID = setInterval(      
      () => this.esperaOrdem(),500
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  ler() {
    this.speaker = new SpeechSynthesisUtterance();
    this.speaker.lang = 'pt-BR';
    this.speaker.rate = 0.65;
    this.speaker.text = 'Senha!.!.!' + '!.!.!' + this.state.sigla + '!.!.!' + this.state.numero + '!.!.!'+ this.state.paciente + '!!!' +  this.state.local;
    speechSynthesis.cancel();
    speechSynthesis.speak(this.speaker);
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

  esperaOrdem() {

    if (this.state.senhas.length > 0) {
      const senhasOrdem = this.state.senhas.sort(function(a, b){return  b.esperaOrdem - a.esperaOrdem})
      
      const ultimoRegistro = senhasOrdem.slice(0,1)
      
      if (ultimoRegistro[0].esperaOrdem > this.state.esperaOrdem) {
                    
        this.setState({              
            sigla: ultimoRegistro[0].sigla,
            numero: ultimoRegistro[0].numero,
            paciente: ultimoRegistro[0].paciente,
            local: ultimoRegistro[0].local,
            //play: true
        }) 
        this.ler()            
        this.setState({
            esperaOrdem: ultimoRegistro[0].esperaOrdem,
            //play: false
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
      return (item.status === "Rechamada Exame" || item.status === "Chamada Exame"  )
    })
    let esperaOrdem = filtro.sort(function(a, b){return  b.esperaOrdem - a.esperaOrdem})
  
    let ultimas = esperaOrdem.slice(1,4)
    let ultima = esperaOrdem.slice(0,1)
    
  
    let mostrarUltima = <div className="list-group">
     { ultima && ultima.map((senha, index) => (          
          <div className="primeira" key={index}>              
            <div> 
              SENHA {senha.sigla}{senha.numero}  <span> - </span> {senha.paciente}
            </div>
            <div>
               <h1> {senha.local} </h1>
            </div>                                                         
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
            <div> <h1> {senha.local}</h1></div>                              
                                                                     
          </div>
      ))}
      </div>
     
  
    return (
      <div>   
        <div className="topo">
          <h1> Clínica Imagem - Painel Exames</h1>
          <img src={logo} alt="Belford Roxo" />
        </div> 
        {mostrarUltima}
        {mostrarSenha}     
      </div>
    )
  }
}
  

 