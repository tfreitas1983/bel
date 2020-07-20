import React, { Component } from 'react'
import SenhaDataService from '../services/senha.service'

export default class Espera extends Component {
    constructor(props) {
        super(props)

        this.pegaSenhas = this.pegaSenhas.bind(this)
        this.buscaSenha = this.buscaSenha.bind(this)
        this.estadoBuscaSenha = this.estadoBuscaSenha.bind(this)

        this.chamarSenha = this.chamarSenha.bind(this)
        this.rechamarSenha = this.rechamarSenha.bind(this)
        this.ultimaChamada = this.ultimaChamada.bind(this)

        this.state = {
            senhas:[],
            buscaSenha: "",
            currentSenha: null,
            currentIndexSenha: -1,
            numero: "",
            tipo: "",
            local: "",
            sigla: "",
            data_senha: "",
            status: ""
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

    estadoBuscaSenha(e) {
        const buscaSenha = e.target.value
        this.buscaSenha()
        
        this.setState({
            currentIndexSenha: -1,
            currentSenha: null,
            buscaSenha: buscaSenha
        })
    }

    buscaSenha(page = 1) {
        SenhaDataService.buscarSenha(this.state.buscaSenha, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    senhas: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
            })
    }

    ativaSenha(senha, indexSala) {
        this.setState({
            currentSenha: senha,
            currentIndexSenha: indexSala
        })
    }

   estadoSelectSala (e) {
        const selectedSala = e.target.value        
        this.setState({
            sala: selectedSala
        })

        if (selectedSala === "Sala Raio-x") {
            this.setState({
                currentSala: {
                    sigla: "RX",
                    sala: selectedSala
                }
            })
        }

        if (selectedSala === "Sala Tomografia") {
            this.setState({
                currentSala: {
                    sigla: "TC",
                    sala: selectedSala
                }
            })
        }

        if (selectedSala === "Sala Densitometria") {
            this.setState({
                currentSala: {
                    sigla: "DO",
                    sala: selectedSala
                }
            })
        }

        if (selectedSala === "Recepção") {
            this.setState({
                currentSala: {
                    sigla: "RCP",
                    sala: selectedSala
                }
            })
        }       
        
        this.setState({
            local: selectedSala
        })        
    } 

    showModalChamada = () => {
        this.setState({ showModalChamada: true })
    }   
    
    hideModalChamada = () => {
        this.setState({ 
            showModalChamada: false
        })
    }

    chamarSenha() {
        let filtroOrdem = (this.state.senhas).filter((item) => {
            return item.esperaOrdem > 0
        })

        let soma = 1

        if(filtroOrdem.length === 0) {
            var data = {
                esperaOrdem: soma,
                status: "Chamada Exame"
            }
            SenhaDataService.editar(this.state.currentSenha.id, data)
            .then(response => {
                this.setState({
                    showModalChamada: false,
                    currentSenha: null,
                    currentIndexSenha: -1
                })  
                this.pegaSenhas()                          
            })
            .catch(e => {
                console.log(e)
            })
        }

        if(filtroOrdem.length > 0 ) {
            let ultima = filtroOrdem.reduce((a,b) => {
                if (b.esperaOrdem > a.esperaOrdem) a = b
                return a
            }) 
            var data = {
                status: "Chamada Exame",
                esperaOrdem: ultima.esperaOrdem+soma
            }
            SenhaDataService.editar(this.state.currentSenha.id, data)
            .then(response => {
                this.setState({
                    showModalChamada: false,
                    currentSenha: null,
                    currentIndexSenha: -1
                })  
                this.pegaSenhas()                          
            })
            .catch(e => {
                console.log(e)
            })
        }        
    }

    rechamarSenha() {       

            let filtroOrdem = (this.state.senhas).filter((item) => {
                return item.esperaOrdem > 0
            })

            let soma = 1
            let ultima = filtroOrdem.reduce((a,b) => {
                if (b.esperaOrdem > a.esperaOrdem) a = b
                return a
            }) 

            var data = {
                status: "Rechamada",
                esperaOrdem: ultima.esperaOrdem+soma
            }
            SenhaDataService.editar(this.state.currentSenha.id, data)
            .then(response => {
                this.setState({
                    showModalChamada: false,
                    currentSenha: null,
                    currentIndexSenha: -1
                })                   
                this.pegaSenhas() 
                
            })
            .catch(e => {
                console.log(e)
            })
                 
    }

    ultimaChamada() {
            
            let filtroOrdem = (this.state.senhas).filter((item) => {
                return item.esperaOrdem > 0
            })

            let soma = 1
            let ultima = filtroOrdem.reduce((a,b) => {
                if (b.esperaOrdem > a.esperaOrdem) a = b
                return a
            }) 

            var data = {
                esperaOrdem: ultima.esperaOrdem+soma
            }

            console.log("Data", data)

            SenhaDataService.editar(this.state.currentSenha.id, data)
            .then(response => {
                this.setState({
                    showModalChamada: false,
                    currentSenha: null,
                    currentIndexSenha: -1
                })                   
                this.pegaSenhas()
                                 
            })
            .catch(e => {
                console.log(e)
            })
            this.setState({
                play:false
            } ) 
    }

    render () {
        const { senhas, numero, local, buscaSenha, currentSenha, currentIndexSenha} = this.state

       
        /*******************************************************************
         * 
         *               BUSCA DE SENHA ENCAMINHADAS
         * 
         ******************************************************************/

        let mostrarSenha = null
        
        if (currentSenha === null || buscaSenha === '') {            
            mostrarSenha = 
            
           senhas && senhas.map(function(senha, index) {
               if (senha.status === "Encaminhada") 
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")} 
                        onClick={() => this.ativaSenha(senha, index)} 
                        key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
                    SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>
                </div>
            }.bind(this))
        }

        if (currentSenha !== null && currentSenha.status === "Encaminhada") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
        SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                
                <div style={{backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Chamar
                </div>
            </div>
        }

        if (currentSenha !== null && currentSenha.status === "Chamada Exame") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
                SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                
                <div style={{backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Chamar 2a vez
                </div>
            </div>
        }

        if (currentSenha !== null && currentSenha.status === "Rechamada Exame") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
                SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                
                <div style={{backgroundColor: '#ff7322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Rechamar
                </div>
            </div>
        }

        /*******************************************************************
         * 
         *                     MODAL DE CHAMADA DE SENHAS
         * 
         *******************************************************************/

        let modalChamada = null
        if(this.state.showModalChamada === true) {
            if (currentSenha.status === "Encaminhada") {
            modalChamada = 
                <div className="modal_bg" onKeyUp={this.handleKeyPress}>
                    <div className="modal" onKeyUp={this.handleKeyPress}>
                        <div className="noprint">
                            <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalChamada}>X</button>
                        </div>
                    <h2 style={{marginLeft: 15+'px'}}> Clínica Imagem</h2>
                        
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {currentSenha.paciente}
                        </label>
                       
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {currentSenha.local}
                        </label>
                        
                        <label style={{fontWeight: 'bold', fontSize:40+'px', marginLeft: 40+'px'}}>
                            Senha: {currentSenha.sigla}{currentSenha.numero}
                        </label>  
                        <div className="noprint">                                  
                        <div>                            
                            <button onClick={this.chamarSenha}>Chamar</button>
                        </div>
                        </div>
                    </div>
                </div>
            }
            if (currentSenha.status === "Chamada Exame") {
                modalChamada = 
                    <div className="modal_bg" onKeyUp={this.handleKeyPress}>
                        <div className="modal" onKeyUp={this.handleKeyPress}>
                            <div className="noprint">
                                <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalChamada}>X</button>
                            </div>
                        <h2 style={{marginLeft: 15+'px'}}> Clínica Imagem</h2>
                            
                            <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                                {currentSenha.paciente}
                            </label>
                           
                            <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                                {currentSenha.local}
                            </label>
                            
                            <label style={{fontWeight: 'bold', fontSize:40+'px', marginLeft: 40+'px'}}>
                                Senha: {currentSenha.sigla}{currentSenha.numero}
                            </label>  
                            <div className="noprint">                                  
                            <div>                            
                                <button onClick={this.rechamarSenha}>Chamar 2a vez</button>
                            </div>
                            </div>
                        </div>
                    </div>
                }
                if (currentSenha.status === "Rechamada Exame") {
                    modalChamada = 
                        <div className="modal_bg" onKeyUp={this.handleKeyPress}>
                            <div className="modal" onKeyUp={this.handleKeyPress}>
                                <div className="noprint">
                                    <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalChamada}>X</button>
                                </div>
                            <h2 style={{marginLeft: 15+'px'}}> Clínica Imagem</h2>
                                
                                <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                                    {currentSenha.paciente}
                                </label>
                               
                                <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                                    {currentSenha.local}
                                </label>
                                
                                <label style={{fontWeight: 'bold', fontSize:40+'px', marginLeft: 40+'px'}}>
                                    Senha: {currentSenha.sigla}{currentSenha.numero}
                                </label>  
                                <div className="noprint">                                  
                                <div>                            
                                    <button onClick={this.ultimaChamada}>Rechamar</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    }
        }

                
        /*******************************************************************
         * 
         *          CAIXA DE TEXTO DE BUSCA DE SENHAS
         * 
         *******************************************************************/

        let autocompleteSenha = null
        if (senhas) {
            autocompleteSenha = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome do paciente"} 
                        onClick={this.buscaSenha} 
                        onKeyUp={this.buscaSenha} 
                        id="pacientesenha" 
                        name="paciente" 
                        value={this.state.buscaSenha} 
                        onChange={this.estadoBuscaSenha}
                        autoComplete="off" /> 
                    </div>                                       
                </div>                                   
                    {mostrarSenha}                                    
            </div>
        }  


        return (
            <div className="col-md-6" style={{marginTop: 60+'px', width:1200+'px'}}>
                <h1>Espera</h1>
                {autocompleteSenha}
                {modalChamada}
            </div>
        )
    }


}