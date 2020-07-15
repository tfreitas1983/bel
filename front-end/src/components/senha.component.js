import React, { Component } from 'react'
import SalaDataService from '../services/sala.service'
import PacienteDataService from '../services/paciente.service'
import SenhaDataService from '../services/senha.service'
import { Link } from "react-router-dom"
import * as moment from 'moment'


export default class Senha extends Component {
    constructor(props) {
        super(props)

        this.pegaSalas = this.pegaSalas.bind(this)
        this.ativaSala = this.ativaSala.bind(this)        
        this.estadoSelectSala = this.estadoSelectSala.bind(this)
        
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

        this.state = {
            senhas:[],
            numero: "",
            tipo: "",
            local: "",
            data_senha: "",
            status: "",
            salas: [],
            currentSala: null,
            filtro: [],
            currentIndexSala: -1,
            buscaDescricao: "",
            pacientes: [],
            info: {},
            page: 1,
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""
        }
    }

    componentDidMount() {
        this.pegaSalas() 
        this.pegaPacientes()   
        this.pegaSenhas()    
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

    estadoBuscaNome(e) {
        const buscaNome = e.target.value
        this.buscaNome()
        this.limpaCurrent()
        this.setState({
            buscaNome: buscaNome
        })
    }

    limpaCurrent() {
        this.setState({            
            
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

    ativaSala(sala, index) {
        this.setState({
            currentSala: sala,
            currentIndexSala: index
        })
    }

    estadoSelectSala (e) {
        const selectedSala = e.target.value
        this.setState(prevState => ({
            currentSala: {
                ...prevState.currentSala,
                sala: selectedSala                
            }
        }))
        this.setState({
            local: selectedSala
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

/*
        if (this.state.current !== "" && this.state.currentSala.sala === "Recepção") {
            
            filtro = (this.state.senhas).filter((item) => {
                return item.local === this.state.currentSala.sala
            })

            console.log(filtro)


            if (filtro.length < 1) {
                maior = {numero: 1}
                
                this.setState({
                    numero: maior.numero
                })
            } 
  
            if (filtro.length > 0) {
                maior = filtro.reduce((a,b) => {
                    if (b.numero > a.numero) a = b
                    return a
                })

                this.setState({
                    numero: maior.numero+soma,
                    tipo: "balcao"
                })
            }

            
        }

        */

        

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
                    tipo: "exame"
                })                
            }   
            
            if (filtro.length === 0) {
                this.setState({
                    numero: soma,
                    tipo: "exame"
                })
            }
        }
        var data = {
            numero: this.state.numero,
            tipo: this.state.tipo,
            local: this.state.currentSala.sala,          
            status: "Gerada",
            data_senha: new Date().toString()
        }
        console.log("Data", data)
        
        SenhaDataService.cadastrar(data) 
        .then(response => {
            this.setState({                 
                id: response.data.id,
                numero: response.data.numero,
                tipo: response.data.tipo,
                local: response.data.local,
                data_senha: response.data.data_senha,                    
                status: response.data.status,
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

    showModal = () => {
        this.setState({ showModal: true })
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
            current: null,
            currentIndex: -1
            
            
        }) 
        this.limpaCurrent()
        this.pegaPacientes()      
        this.pegaSenhas()
    }



    render() {
        const { senhas, numero, local, buscaDescricao, salas, resposta, currentSala, currentIndexSala, buscaNome, pacientes, info, page, current, currentIndex } = this.state

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
                
        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.nome}
                {<Link to={`/pacientes/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}
            </div>
        } 
        if (current === null || buscaNome === '') {            
            mostrar = 
            <div className="list-group">
           { pacientes && pacientes.map((paciente, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaPaciente(paciente, index)} 
                key={index} > 
                    {paciente.nome} {moment(paciente.dtnascimento).format('DD/MM/YYYY')}                    
                </div>
            ))}
            </div>
        }

        
       
        let autocomplete = null
        if (pacientes) {
            autocomplete = 
            <div>
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

        let modal = null
        if(this.state.showModal === true) {
            modal = 
                <div className="modal_bg">
                    <div className="modal" >
                        <div className="noprint">
                            <button type="button" className="closeButton" id="closeButton" onClick={this.hideModal}>X</button>
                        </div>
                    <h2 style={{marginLeft: 15+'px'}}> Clínica Imagem</h2>
                        
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {current.nome}
                        </label>
                       
                        <label style={{fontWeight: 'bold', fontSize:24+'px', marginLeft: 25+'px'}}>
                            {local}
                        </label>
                        
                        <label style={{fontWeight: 'bold', fontSize:40+'px', marginLeft: 40+'px'}}>
                            Senha: {numero}
                        </label>  
                        <div className="noprint">                                  
                            <button onClick={() => window.print()} className="btn btn-success">
                                Imprimir
                            </button>
                        </div>
                    </div>
                </div>
        }

        let autocompleteSenha = null
        if (pacientes) {
            autocompleteSenha = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o número da senha"} 
                        onClick={this.buscaSenha} 
                        onKeyUp={this.buscaSenha} 
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


        return (
            <div className="edit-form" style={{marginTop: 60+'px'}}>
                <div className="noprint">
                    <h1>Senha</h1>
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
                    </div>
                    <div className="col-md-5">
                        <label>Sala</label>
                        <div className="actions2">                                
                            <select 
                                className="form-control" 
                                id="sala" 
                                name="sala"      
                                value={this.state.local}              
                                onChange={this.estadoSelectSala} >
                                <option value="">---Selecione---</option>  
                                {salas && salas.map((sala, index) => (
                                    <option value={sala.descricao} key={index} onClick={() => this.ativaSala(sala, index)}>{sala.descricao}</option>
                                ))}                             
                            </select>
                            <button type="button" onClick={this.gerarSenha}>
                                Gerar Senha
                            </button>
                        
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        )
    }
}