import React, { Component } from 'react'

import SalaDataService from '../services/sala.service'
import PacienteDataService from '../services/paciente.service'
import SenhaDataService from '../services/senha.service'
import GuicheDataService from '../services/guiche.service'
import { Link } from "react-router-dom"
import * as moment from 'moment'

export default class Senha extends Component {
    constructor(props) {
        super(props)

        this.pegaSalas = this.pegaSalas.bind(this)
        this.ativaSala = this.ativaSala.bind(this)        
        this.estadoSelectSala = this.estadoSelectSala.bind(this)

        this.pegaSenhas = this.pegaSenhas.bind(this)
        this.buscaSenha = this.buscaSenha.bind(this)
        this.estadoBuscaSenha = this.estadoBuscaSenha.bind(this)
        this.apagar = this.apagar.bind(this)

        this.pegaGuiches = this.pegaGuiches.bind(this)
        this.ativaGuiche = this.ativaGuiche.bind(this)        
        this.estadoSelectGuiche = this.estadoSelectGuiche.bind(this)
        
        this.pegaPacientes = this.pegaPacientes.bind(this)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.pegaPacientes = this.pegaPacientes.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaPaciente = this.ativaPaciente.bind(this)
        this.buscaNome = this.buscaNome.bind(this)        
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this) 
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.selecionaPagina = this.selecionaPagina.bind(this)

        this.gerarSenha = this.gerarSenha.bind(this)
        this.chamarSenha = this.chamarSenha.bind(this)
        this.rechamarSenha = this.rechamarSenha.bind(this)
        this.ultimaChamada = this.ultimaChamada.bind(this)
        this.encaminharSenha = this.encaminharSenha.bind(this)
        this.cancelar = this.cancelar.bind(this)


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
            status: "",
            salas: [],
            currentSala: null,
            guiches: [],
            guiche: "",
            currentGuiche: null,
            currentIndexGuiche: -1,
            currentIndexSala: -1,
            buscaDescricao: "",
            pacientes: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: "",
            showModalGuiche: null
        }
    }

    componentDidMount() {
        this.pegaSalas() 
        this.pegaPacientes()   
        this.pegaSenhas() 
        this.pegaGuiches()   
        this.showModalGuiche()
    }

    pegaPacientes(page = 1) {        
        PacienteDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do membro e "info" com os dados das páginas
                const { docs, ...info } = response.data 
                this.setState({
                    pacientes: docs,
                    info: info,
                    page: page
                })                
            })
            .catch(e => {
                console.log(e)
            })
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

    pegaGuiches() {
        GuicheDataService.buscarTodos()
        .then(response => {
            this.setState({
                guiches: response.data
            })            
        })
        .catch(e => {
            console.log(e)
        })
    }

    estadoBuscaNome(e) {
        const buscaNome = e.target.value
        this.buscaNome()
        this.limpaCurrent()
        this.setState({
            buscaNome: buscaNome
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

    limpaCurrent() {
        this.setState({
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""            
        })
    }

    limpaCurrentSenha() {
        this.setState({           
           
            buscaSenha: "",
            local: "",
            data_senha: "",
            status: ""
        })       
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.pegaPacientes(pageNumber) 
        this.limpaCurrent()
    }

    nextPage = () => {
        const { page, info } = this.state;
        if (page === info.pages) return; //.pages é a última pagina e o return não faz nada
        const pageNumber = page + 1;
        this.pegaPacientes(pageNumber)
        this.limpaCurrent()     
    }

    selecionaPagina(e) {
        const i = e.target.id
        const selectedPage = e.target.id
         this.setState({
            selectedPage: i,
            page: selectedPage
        })
        if(!this.state.buscaNome) {
            this.pegaPacientes(selectedPage) 
            this.limpaCurrent()        
        }
        if (this.state.buscaNome) {
            this.buscaNome(selectedPage)
        }        
    }  
    
    buscaNome(page = 1) {
        PacienteDataService.buscarNome(this.state.buscaNome, page)
            .then(response => {
                const { docs, ...info } = response.data 
                this.setState({
                    pacientes: response.data.docs,
                    info: info                                 
                })    
            })
            .catch(e => {
                console.log(e)
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

    ativaSala(sala, indexSala) {
        this.setState({
            currentSala: sala,
            currentIndexSala: indexSala
        })
    }

    ativaGuiche(guiche, index) {
        this.setState({
            currentGuiche: guiche,
            currentIndexGuiche: index
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

    estadoSelectGuiche (e) {
        const selectedGuiche = e.target.value
        this.setState(prevState => ({
            currentGuiche: {
                ...prevState.currentGuiche,
                guiche: selectedGuiche                
            }
        })) 
        this.setState({
            guiche: selectedGuiche
        })     
    }

    ativaPaciente(paciente, index) {
        this.setState({
            current: paciente,
            currentIndex: index
        })
    }

    atualizaLista() {
        this.pegaPacientes()
        this.limpaCurrent()
    }

    gerarSenha() {
        

        let filtro = []
        let maior = []
        let soma = 1

        if (!this.state.current) {
            alert("Selecione um paciente")
            return
        }


        if (!this.state.currentSala) {
            alert("Selecione uma sala")
            return
        }

        if (!this.state.guiche) {
            alert("Selecione um guichê")
            return
        }


        if (this.state.current && this.state.currentSala) {
            
            
            filtro = (this.state.senhas).filter((item) => {
                return item.local === this.state.currentSala.sala
            })
                         

            if (filtro.length > 0) {
                maior = filtro.reduce((a,b) => {
                    if (b.numero > a.numero) a = b
                    return a
                })           
                this.setState({
                    numero: (maior.numero)+soma,
                    tipo: "exame",
                    paciente: this.state.current.nome,
                    sigla: this.state.currentSala.sigla
                })                
            }   
            
            if (filtro.length === 0) {
                this.setState({
                    numero: soma,
                    tipo: "exame",
                    paciente: this.state.current.nome,
                    sigla: this.state.currentSala.sigla
                })
            }
        }
        var data = {
            numero: this.state.numero,
            paciente: this.state.current.nome,
            tipo: this.state.tipo,
            local: this.state.currentSala.sala,  
            sigla: this.state.currentSala.sigla, 
            guiche: this.state.currentGuiche.guiche,     
            status: "Gerada",
            data_senha: new Date().toString(),
            ordem: 0,
            esperaOrdem: 0
        }
        
        
        SenhaDataService.cadastrar(data) 
        .then(response => {
            this.setState({                 
                id: response.data.id,
                numero: response.data.numero,
                paciente: response.data.paciente,
                tipo: response.data.tipo,
                local: response.data.local,
                data_senha: response.data.data_senha,
                sigla: response.data.sigla,    
                guiche: response.data.guiche,         
                status: response.data.status,
                ordem: response.data.ordem,
                esperaOrdem: response.data.esperaOrdem,
                situacao: response.data.situacao,
                submitted: true                
            })                        
            this.showModal()  
                 
            filtro = ""
            maior = ""            
        })
        .catch(e => {
            console.log(e)
        })         
    }

    showModalGuiche = () => {
        this.setState({ showModalGuiche: true })
      }

    showModal = () => {
        this.setState({ showModal: true })
      
    }

    showModalSenha = () => {
        this.setState({ showModalSenha: true })
    }

    showModalChamada = () => {
        this.setState({ showModalChamada: true })
    }   
    
    hideModalChamada = () => {
        this.setState({ 
            showModalChamada: false
        })
    }

    showModalEncaminhar = () => {
        this.setState({ showModalEncaminhar: true })
    }   
    
    hideModalEncaminhar = () => {
        this.setState({ 
            showModalEncaminhar: false
        })
    }

    hideModalSenha = () => {
    this.setState({ 
        showModalSenha: false,
        currentSenha: null,
        currentSala: null,
        selectedSala: "",
        numero: "",
        tipo: "",
        buscaNome: "",
        buscaSenha: "",
        current: null,
        currentIndexSenha: -1        
    }) 
    this.limpaCurrentSenha()
    this.pegaPacientes()      
    this.pegaSenhas()
    }

    hideModal = () => {
        this.setState({ 
            showModal: false,
            current: null,
            currentSala: null,
            selectedSala: "",
            numero: "",
            tipo: "",
            buscaNome: "",            
            currentIndex: -1
        }) 
        this.limpaCurrentSenha()
        this.pegaPacientes()      
        this.pegaSenhas()
    }

    hideModalGuiche = () => {
        this.setState({ 
            showModalGuiche: false
        })         
        this.pegaPacientes()      
        this.pegaSenhas()
    }

    handleKeyPress = (event) => {
        if(event.key === 27){
          this.hideModal()
          this.hideModalSenha()
        }
    }

    chamarSenha() {
        if (this.state.currentSenha.status === "Gerada") {
            let filtroOrdem = (this.state.senhas).filter((item) => {
                return item.ordem > 0
            })

            let soma = 1

            if(filtroOrdem.length === 0) {                
                var data = {
                    status: "Chamada",
                    ordem: soma
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

            if(filtroOrdem.length > 0) {
                let ultima = filtroOrdem.reduce((a,b) => {
                    if (b.ordem > a.ordem) a = b
                    return a
                })                
            
                if(ultima.ordem > 0) {
                    var data = {
                        status: "Chamada",
                        ordem: ultima.ordem+soma
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

            
        }  
    }

    rechamarSenha() {       

            let filtroOrdem = (this.state.senhas).filter((item) => {
                return item.ordem > 0
            })

            let soma = 1
            let ultima = filtroOrdem.reduce((a,b) => {
                if (b.ordem > a.ordem) a = b
                return a
            }) 

            var data = {
                status: "Rechamada",
                ordem: ultima.ordem+soma
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
                return item.ordem > 0
            })

            let soma = 1
            let ultima = filtroOrdem.reduce((a,b) => {
                if (b.ordem > a.ordem) a = b
                return a
            }) 

            var data = {
                ordem: ultima.ordem+soma
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

    encaminharSenha() {

        var data = {
            status: "Encaminhada"
        }

        SenhaDataService.editar(this.state.currentSenha.id, data)
        .then(response => {
            this.setState({
                showModalEncaminhar: false,
                currentSenha: null,
                currentIndexSenha: -1
            })                   
            this.pegaSenhas()
        })
        .catch(e => {
            console.log(e)
        })
    }

    apagar() {
        SenhaDataService.apagarTodos()
        .then(response => {
            console.log(response.data)
            this.pegaSenhas()
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    cancelar() {
        SenhaDataService.apagar(this.state.currentSenha.id)
        .then(response => {
            this.props.history.push('/senhas')
        })        
        .catch(e => {
            console.log(e)
        })
        this.pegaSenhas()
        this.setState({
            buscaSenha: "",
            currentSenha: null,
            currentIndexSenha: -1,
            current: null,
            id: "",
            senhas: [],
            situacao: false,
            situacao: false,
            sala: "",
            sigla: ""
        })  
        this.pegaSenhas()
    }



    render() {
        const { senhas, numero, local, buscaSenha, currentSenha, currentIndexSenha,
            salas, guiches, currentSala, currentIndexSala,
            currentGuiche, currentIndexGuiche ,
            buscaNome, pacientes, info, page, current, currentIndex } = this.state

        //Reinderiza os números das páginas de acordo com o total delas
        //Deixando selecionado a página corrente no array paginas
        let i = 0
        let paginas = []
        for ( i = 1; i <= info.pages; i++ ) {
            paginas.push(
                <li className={"page-item " + (page === i ? "active" : "")} key={i}>
                    <span className="page-link" key={i} id={i} onClick={this.selecionaPagina} >
                        {i}
                    </span>
                </li>
            )            
        } 

        /*******************************************************************
         * 
         *                      SENHAS GERADAS
         * 
         ******************************************************************/
                
        let mostrarSenha = null
        
        if (currentSenha === null || buscaSenha === '') {
                      
            mostrarSenha = 
            
             senhas && senhas.map(function(senha, index) {
               if (senha.status === "Gerada" || senha.status === "Chamada" || senha.status === "Rechamada" ) 
                return <div className="list-group" key={index}>
                            <div className={"autocomplete-items" + (index === currentIndexSenha ? "-active" : "")} 
                                onClick={() => this.ativaSenha(senha, index)} 
                                key={index} 
                                style={{display: 'flex', justifyContent: 'space-between'}}> 
                                    SENHA {senha.sigla}{senha.numero} - {senha.paciente} - {senha.local}  - {senha.status}
                                    <div style={{backgroundColor: '#aaaf22', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={() =>this.showModalSenha}>
                                        Reimprimir
                                    </div>    
                            </div> 
                        </div>
                
            }.bind(this))
            
        }

        
        if (currentSenha !== null && currentSenha.status === "Gerada") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
                SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                <div style={{backgroundColor: '#437322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalSenha}>
                    Reimprimir
                </div>
                <div style={{backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Chamar
                </div>
                <div style={{backgroundColor: '#FF0022', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} 
                onClick={(e) => { if (window.confirm('Tem certeza em apagar essa senha?')) this.cancelar(e)}}>
                    Cancelar
                </div>
            </div>
        }

        if (currentSenha !== null && currentSenha.status === "Chamada") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
                SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                <div style={{backgroundColor: '#437322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalSenha}>
                    Reimprimir
                </div>
                <div style={{backgroundColor: '#997322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Chamar 2a vez
                </div>
                <div style={{backgroundColor: '#dd7322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalEncaminhar}>
                    Encaminhar
                </div>
                <div style={{backgroundColor: '#FF0022', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} 
                onClick={(e) => { if (window.confirm('Tem certeza em apagar essa senha?')) this.cancelar(e)}}>
                    Cancelar
                </div>
            </div>
        }

        if (currentSenha !== null && currentSenha.status === "Rechamada") {
            mostrarSenha =  <div className="autocomplete-items-active" >
                
                SENHA  {currentSenha.sigla}{currentSenha.numero} {currentSenha.paciente} {currentSenha.local} {currentSenha.status}
                <div style={{backgroundColor: '#437322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalSenha}>
                    Reimprimir
                </div>
                <div style={{backgroundColor: '#ff7322', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalChamada}>
                    Rechamar
                </div>
                <div style={{backgroundColor: '#dd7398', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} onClick={this.showModalEncaminhar}>
                    Encaminhar
                </div>
                <div style={{backgroundColor: '#FF0022', color: '#fefefe', cursor: 'pointer', margin:0, padding: 0,borderRadius: 5+'px'}} 
                onClick={(e) => { if (window.confirm('Tem certeza em apagar essa senha?')) this.cancelar(e)}}>
                    Cancelar
                </div>
            </div>
        }

        /*******************************************************************
         * 
         *              RESULTADO DE BUSCA DE PACIENTES
         * 
         ******************************************************************/

        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.nome}
                {<Link to={`/pacientes/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}
            </div>
        } 
        if (current === null || buscaNome === '') {            
            mostrar = 
            <div className="list-group" style={{width:92+'%'}}>
           { pacientes && pacientes.map((paciente, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaPaciente(paciente, index)} 
                key={index} > 
                    {paciente.nome} {moment(paciente.dtnascimento).format('DD/MM/YYYY')}                    
                </div>
            ))}
            </div>
        }

        /*******************************************************************
         * 
         *          CAIXA DE TEXTO PARA BUSCA DE PACIENTES
         * 
         *******************************************************************/
       
        let autocomplete = null
        if (pacientes) {
            autocomplete = 
            <div style={{width: 100+'%'}}>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome do paciente"} 
                        onClick={this.buscaNome} 
                        onKeyUp={this.buscaNome} 
                        id="paciente" 
                        name="paciente" 
                        value={this.state.buscaNome} 
                        onChange={this.estadoBuscaNome}
                        autoComplete="off" /> 
                    </div>                                       
                </div>                                   
                    {mostrar}                                    
            </div>
        }         

        /*******************************************************************
         * 
         *                      MODAL IMPRESSÃO DE SENHA
         * 
         ******************************************************************/

        let modal = null
        if(this.state.showModal === true) {
            modal = <div>
                <div className="noprint">
                    <div className="modal_bg">
                        
                    </div>
                </div>
                <div className="impressao" onKeyPress={this.handleKeyPress} >                        
                    <div className="noprint">
                        <button type="button" className="closeButton" id="closeButton" onClick={this.hideModal}>X</button>
                    </div>
                    <h2 style={{marginLeft: 40+'px'}}> Clínica Imagem</h2>
                    
                    <label style={{fontWeight: 'bold', fontSize:24+'px'}}>
                        {current.nome}
                    </label>
                
                    <label style={{fontWeight: 'bold', fontSize:24+'px'}}>
                        {local}
                    </label>
                    <div style={{display: 'flex', margin:0, padding: 0}}>
                        <label style={{fontWeight: 'bold', fontSize:36+'px'}}> Senha: </label> 
                        <label style={{fontWeight: 'bold', fontSize:36+'px'}}>{" "}{this.state.currentSala.sigla}{numero}</label>
                    </div>
                    <div className="noprint">
                    <div className="actions">                                  
                        <button onClick={() => window.print()} style={{marginLeft: 180+'px'}} className="btn btn-success">
                            Imprimir
                        </button>
                        <button type="button" onClick={this.hideModal}>
                            Fechar
                        </button>
                        
                    </div>
                    </div>
                </div> 
            </div>
        }

        /*******************************************************************
         * 
         *                  MODAL REIMPRESSÃO DE SENHA
         * 
         ******************************************************************/

        let modalReimprimir = null
        if(this.state.showModalSenha === true) {
            modalReimprimir = 
                <div>
                    <div className="noprint">
                        <div className="modal_bg">
                            
                        </div>
                    </div>                   
                    <div className="impressao">
                        <div className="noprint">
                            <button type="button" className="closeButton" id="closeButton" onClick={this.hideModalSenha}>X</button>
                        </div>
                        <h2 style={{marginLeft: 25+'px'}}> Clínica Imagem</h2>
                        
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {currentSenha.paciente}
                        </label>
                       
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {currentSenha.local}
                        </label>
                        
                        <label style={{fontWeight: 'bold', fontSize:40+'px', marginLeft: 30+'px'}}>
                            Senha: {currentSenha.sigla}{currentSenha.numero}
                        </label>  
                        <div className="noprint">   
                            <div  style={{marginLeft: 180+'px'}} >
                                <button onClick={() => window.print()} className="btn btn-success">
                                    Imprimir
                                </button>
                            </div>                               
                        </div>
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
            if (currentSenha.status === "Gerada") {
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
            if (currentSenha.status === "Chamada") {
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
                if (currentSenha.status === "Rechamada") {
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
         *                     MODAL DE ENCAMINHAR SENHAS
         * 
         *******************************************************************/

        let modalEncaminhar = null

        if(this.state.showModalEncaminhar === true) {
        
            if (currentSenha.status === "Chamada") {
                modalEncaminhar = 
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
                                    <button onClick={this.encaminharSenha}>Encaminhar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            if (currentSenha.status === "Rechamada") {
                modalEncaminhar = 
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
                                <button onClick={this.encaminharSenha}>Encaminhar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                }
            }
        


                
        /*******************************************************************
         * 
         * Caixa de texto para a busca de senhas
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
        
        /******************************************************************
         * 
         *                MODAL DE GUICHÊ DE RECEPÇÃO
         * 
         *****************************************************************/
        
        let modalGuiche = null
        
        if (this.state.showModalGuiche === true) {
            modalGuiche =
            <div className="modal_bg" onKeyUp={this.handleKeyPress}>
                <div className="modal" onKeyUp={this.handleKeyPress}>
                    
                    
                        <h1 style={{marginLeft:160+'px'}}>Guichê</h1>                                                
                        <select 
                            className="form-control" 
                            id="guiche" 
                            name="guiche"      
                            value={this.state.guiche}              
                            onChange={this.estadoSelectGuiche} >
                            <option value="">---Selecione---</option>  
                            {guiches && guiches.map((guiche, index) => (
                                <option value={guiche.descricao} key={index} onClick={() => this.ativaGuiche(guiche, index)}>
                                    {guiche.descricao}
                                </option>
                            ))}                             
                        </select>
                        <div>                            
                            <button onClick={this.hideModalGuiche}>Fechar</button>
                        </div>
                   
                </div>
            </div>
        }


        return (
            <div className="edit-form" style={{marginTop: 60+'px', width:1200+'px'}}>
                <div className="noprint">                    
                    <div className="actions">
                        <h1>Senhas</h1> 
                       
                        <div className="actions">                           
                            <label style={{marginRight:10+'px'}}>Guichê</label>                                                
                            <select 
                                className="form-control" 
                                id="guiche" 
                                name="guiche"      
                                value={this.state.guiche}              
                                onChange={this.estadoSelectGuiche} >
                                <option value="">---Selecione---</option>  
                                {guiches && guiches.map((guiche, index) => (
                                    <option value={guiche.descricao} key={index} onClick={() => this.ativaGuiche(guiche, index)}>
                                        {guiche.descricao}
                                    </option>
                                ))}                             
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="adicionar">                  
                            <Link to={"/pacientes/adicionar"}>Novo Paciente</Link>                            
                        </div>                    
                        {autocomplete}
                        <div className="actions">
                            <button disabled={page === 1} onClick={this.prevPage}>
                                Anterior
                            </button>                        
                            <ul className="pagination">
                            { paginas }
                            </ul>                        
                            <button disabled={page === info.pages} onClick={this.nextPage}>
                                Próxima
                            </button>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={this.apagar}>Apagar Anteriores</button>
                    </div>
                    <div className="col-md-5">
                        <label>Sala</label>
                        <div className="actions">                                
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
                            <div>
                            <button type="button" style={{width:10+'em', height: 3+'em',marginLeft: 10+'px', padding: 15+'px'}} onClick={this.gerarSenha}>
                                Gerar Senha
                            </button>
                            </div>
                        </div>
                        {autocompleteSenha}
                    </div>
                </div>
                {modal} {modalReimprimir} {modalChamada} {modalGuiche} {modalEncaminhar}
            </div>
        )
    }
}



