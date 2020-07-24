import React, { Component } from 'react'
import SenhaDataService from '../services/senha.service'
import SalaDataService from '../services/sala.service'

export default class Espera extends Component {
    constructor(props) {
        super(props)

        this.pegaSenhas = this.pegaSenhas.bind(this)
        this.buscaSenha = this.buscaSenha.bind(this)
        this.estadoBuscaSenha = this.estadoBuscaSenha.bind(this)

        this.pegaSalas = this.pegaSalas.bind(this)
        this.estadoSelectSala = this.estadoSelectSala.bind(this)
        this.ativaSala = this.ativaSala.bind(this)

        this.chamarSenha = this.chamarSenha.bind(this)
        this.rechamarSenha = this.rechamarSenha.bind(this)
        this.ultimaChamada = this.ultimaChamada.bind(this)
        this.finalizar = this.finalizar.bind(this)

        this.state = {
            senhas:[],
            buscaSenha: "",
            currentSenha: null,
            currentIndexSenha: -1,
            salas:[],
            currentSala: null,
            currentIndexSala: -1,
            numero: "",
            sala: "",
            tipo: "",
            local: "",
            sigla: "",
            data_senha: "",
            status: ""
        }
    }

    componentDidMount() {
        this.pegaSenhas()
        this.pegaSalas()
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

    pegaSalas() {        
        SalaDataService.buscarTodos()
        .then(response => {
            this.setState({
                salas: response.data
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

    ativaSala(sala, indexSala) {
        this.setState({
            currentSala: sala,
            currentIndexSala: indexSala
        })
    }

   estadoSelectSala(e) {
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
        this.setState({ 
            showModalChamada: true 
        })
    }   
    
    hideModalChamada = () => {
        this.setState({ 
            showModalChamada: false,
            sala: "",
            currentSala: null,
            currentSenha: null,
            currentIndexSenha: -1,
            currentIndexSala: -1
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
                status: "Rechamada Exame",
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

    finalizar() {
        var data = {
            status: "Finalizada"
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

    render () {
        const { senhas, numero, local, buscaSenha, currentSenha, currentIndexSenha, salas, currentIndexSala} = this.state

       
        /*******************************************************************
         * 
         *               BUSCA DE SENHA ENCAMINHADAS
         * 
         ******************************************************************/

        let mostrarSenha = null

        if (currentSenha && currentSenha !== null) {            
            mostrarSenha = senhas && senhas.map(function(senha, index) {
               if (senha.status === "Encaminhada" || senha.status === "Chamada Exame" || senha.status === "Rechamada Exame") 
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")} 
                        onClick={() => this.ativaSenha(senha, index)} 
                        key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
                    SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>
                    <div style={{display: 'flex',justifyContent: 'center',backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                        Chamar
                    </div>
                </div>
            }.bind(this))
        }


        if (currentSenha === null && buscaSenha === '') {            
            mostrarSenha = senhas && senhas.map(function(senha, index) {
               if (senha.status === "Encaminhada" || senha.status === "Chamada Exame" || senha.status === "Rechamada Exame") 
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")} 
                        onClick={() => this.ativaSenha(senha, index)} 
                        key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
                    SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>                    
                </div>
            }.bind(this))
        }

        if (currentSenha === null && buscaSenha !== '') {            
            mostrarSenha = senhas && senhas.map(function(senha, index) {
               if (senha.status === "Encaminhada" || senha.status === "Chamada Exame" || senha.status === "Rechamada Exame") 
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")} 
                        onClick={() => this.ativaSenha(senha, index)} 
                        key={index} style={{display: 'flex', justifyContent: 'space-between'}}> 
                    SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>                    
                </div>
            }.bind(this))
        }


        let filtro = null
        if (local === "Sala Raio-x") {                                 
            filtro = senhas.filter((item) => {
                return item.local === "Sala Raio-x" && (item.status === "Encaminhada" || item.status === "Chamada Exame" || item.status === "Rechamada Exame") 
            })                    
            mostrarSenha = filtro.map(function(senha, index) {
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")}
                        onClick={() => this.ativaSenha(senha, index)}
                        key={index} 
                        style={{display: 'flex', justifyContent: 'space-between'}}> 
                        SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>
                    <div style={{display: 'flex',justifyContent: 'center',backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                        Chamar
                    </div>
                </div>
            }.bind(this))
        }

        if (local === "Sala Tomografia") {                                 
            filtro = senhas.filter((item) => {
                return item.local === "Sala Tomografia" && (item.status === "Encaminhada" || item.status === "Chamada Exame" || item.status === "Rechamada Exame") 
            })                    
            mostrarSenha = filtro.map(function(senha, index) {
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")}
                        onClick={() => this.ativaSenha(senha, index)}
                        key={index} 
                        style={{display: 'flex', justifyContent: 'space-between'}}> 
                        SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>
                    <div style={{display: 'flex',justifyContent: 'center',backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                        Chamar
                    </div>
                </div>
            }.bind(this))
        }

        if (local === "Sala Densitometria") {                                 
            filtro = senhas.filter((item) => {
                return item.local === "Sala Densitometria" && (item.status === "Encaminhada" || item.status === "Chamada Exame" || item.status === "Rechamada Exame") 
            })                    
            mostrarSenha = filtro.map(function(senha, index) {
                return <div className="list-group">
                    <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")}
                        onClick={() => this.ativaSenha(senha, index)}
                        key={index} 
                        style={{display: 'flex', justifyContent: 'space-between'}}> 
                        SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                    </div>
                    <div style={{display: 'flex',justifyContent: 'center', backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                        Chamar
                    </div>
                </div>
            }.bind(this))
        }
        /*
        if (currentSenha !== null && currentSenha.status === "Chamada Exame") {
            mostrarBotao =  <div className="autocomplete-items-active" >
                <div style={{backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0, borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Chamar 2a vez
                </div>
                <div style={{backgroundColor: '#237322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Finalizar
                </div>
            </div>
        }

        if (currentSenha !== null && currentSenha.status === "Rechamada Exame") {
            mostrarBotao =  <div className="autocomplete-items-active" >
                
                              
                <div style={{backgroundColor: '#ff7322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Rechamar
                </div>
                <div style={{backgroundColor: '#237322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Finalizar
                </div>
            </div>
        }
        */

        /*******************************************************************
         * 
         *                     MODAL DE CHAMADA DE SENHAS
         * 
         *******************************************************************/

        let modalChamada = null
        if(this.state.showModalChamada === true) {
            if (currentSenha && currentSenha.status === "Encaminhada") {
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
            if (currentSenha && currentSenha.status === "Chamada Exame") {
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
                                    <button onClick={this.rechamarSenha} style={{width: 150+'px'}}>Chamar 2ª vez</button>
                                </div>
                                <div>                            
                                    <button onClick={this.finalizar} style={{width: 150+'px', color: '#f2f2f2'}}>Finalizar</button>
                                </div>                    
                            </div>
                        </div>
                    </div>
                }
                if (currentSenha && currentSenha.status === "Rechamada Exame") {
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
                                    <div>                            
                                        <button onClick={this.finalizar} style={{width: 150+'px', color: '#f2f2f2'}}>Finalizar</button>
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
                <select 
                    className="form-control" 
                    id="sala" 
                    name="sala"      
                    value={this.state.local}              
                    onChange={this.estadoSelectSala} >
                    <option value="">---Selecione---</option>  
                    {salas && salas.map((sala, indexSala) => (
                        <option value={sala.descricao} key={indexSala} onClick={() => this.ativaSala(sala, indexSala)} >{sala.descricao}</option>
                    ))}                             
                </select>                             
                {mostrarSenha}                                    
            </div>
        }  


        return (
            <div className="col-md-6" style={{marginTop: 60+'px', width:1200+'px'}}>
                <h1>Sala de Espera - Exames</h1>
                {autocompleteSenha}
                
                {modalChamada}
            </div>
        )
    }


}