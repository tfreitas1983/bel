import React, { Component } from 'react'
import PacienteDataService from "../services/paciente.service"
import { Link } from "react-router-dom"
import * as moment from 'moment'

export default class PacientesLista extends Component {
    constructor(props) {
        super(props)
        this.estadoBuscaNome = this.estadoBuscaNome.bind(this)
        this.pegaPacientes = this.pegaPacientes.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaPaciente = this.ativaPaciente.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
      
        this.buscaNome = this.buscaNome.bind(this)        
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this) 
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.selecionaPagina = this.selecionaPagina.bind(this)

        this.state = {
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
        this.pegaPacientes()        
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
            current: null,
            currentIndex: -1,
            selectedPage: null,
            buscaNome: ""            
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

    pegaPacientes(page = 1) {        
        PacienteDataService.buscarTodos(page)
            .then(response => {
            //REST do response da API em duas constantes: 
            // "docs" com os dados do paciente e "info" com os dados das páginas
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

    atualizaLista() {
        this.pegaPacientes()
        this.limpaCurrent()
    }

    ativaPaciente(paciente, index) {
        this.setState({
            current: paciente,
            currentIndex: index
        })
    }
 

    atualizaSituacao(status) {
        var data = {
            id: this.state.current.id,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento, 'DD-MM-YYYY'),
            cpf: this.state.current.cpf,
            sexo: this.state.current.sexo,
            telefone: this.state.current.telefone,
            email: this.state.current.email,            
            rua: this.state.current.rua,
            num: this.state.current.num,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: this.state.current.cidade,
            uf: this.state.current.uf,
            cep: this.state.current.cep,
            foto: this.state.current.foto,
            situacao: status
        }

        PacienteDataService.editar(this.state.current.id, data)
            .then(response => {
                this.setState(prevState => ({
                    current: {
                        ...prevState.current,
                        situacao: status
                    }
                }))

            })
            .catch(e => {
                console.log(e)
            })
    }



    render() {
        const { buscaNome, pacientes, info, page, current, currentIndex} = this.state

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next)
            return acc
          }, {})

        const images = importAll(
            require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/)
            )

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
                    {paciente.nome}
                   
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

        return (
            <div className="list">
                
                <div className="col-md-6">
                    <div className="adicionar">                  
                        <Link to={"/pacientes/adicionar"}>Cadastrar</Link>
                    </div>
                    <h4>Lista de pacientes</h4>
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

                <div>
                    {current ? (
                    <div>
                        <div className="col-md-5">
                            <div className="imagem">
                                <img 
                                    src={current.foto}
                                    className="imagem"
                                    alt=""
                                    name="foto" 
                                    id="foto"
                                />
                            </div>

                            <h4> {current.nome} </h4>
                            <hr/>
                            <div>                            
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}   
                                { current.situacao ? "Ativo" : "Inativo" }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Data de nascimento: </strong>
                                </label>{" "}
                                {moment(current.dtnascimento).format('DD/MM/YYYY')}
                            </div>

                            <div>
                                <label>
                                    <strong>CPF: </strong>
                                </label>{" "}
                                { current.cpf }
                            </div>

                            <div>
                                <label>
                                    <strong>Sexo: </strong>
                                </label>{" "}
                                { current.sexo }
                            </div>

                            <div>
                                <label>
                                    <strong>Telefone: </strong>
                                </label>{" "}
                                { current.telefone }
                            </div>

                            <div>
                                <label>
                                    <strong>E-mail: </strong>
                                </label>{" "}
                                { current.email }
                            </div>                            
                
                            <div>
                                <label>
                                    <strong>Rua:</strong>
                                </label>{" "}
                                { current.rua }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Número:</strong>
                                </label>{" "}
                                { current.num }
                            </div>

                            <div>
                                <label>
                                    <strong>Complemento:</strong>
                                </label>{" "}
                                { current.complemento }
                            </div>

                            <div>
                                <label>
                                    <strong>Bairro:</strong>
                                </label>{" "}
                                { current.bairro }
                            </div>
                            
                            <div>
                                <label>
                                    <strong>Cidade:</strong>
                                </label>{" "}
                                { current.cidade }
                            </div>
                            <div className="row">
                                <div className="duplo">
                                    <label>
                                        <strong>UF:</strong>
                                    </label>{" "}
                                    { current.uf }
                                </div>
                                <div className="col-md-5">                               
                                    <label>
                                        <strong>CEP:</strong>
                                    </label>{" "}
                                    { current.cep }
                                </div>
                            </div>
                            
                            <div className="labels" style={{justifyContent: 'space-between'}}>
                                <Link to={"/pacientes/" + current.id} className="badge badge-warning">
                                    Editar
                                </Link>
                                {current.situacao ? (
                                        <button className="badge badge-danger mr-2" onClick={() => this.atualizaSituacao(false)}>
                                            Inativar
                                        </button>
                                    ) : (
                                        <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                                            Ativar
                                        </button>
                                    )} 
                            </div>
                            
                        </div>
                            
                        </div>
                    
                        ) : (
                            <div>
                                <br />
                                <p>Clique em um paciente...</p>
                            </div>
                    )}
                </div>
            </div>
        )
    }
}