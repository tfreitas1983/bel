import React, { Component } from 'react'
import SalaDataService from "../services/sala.service"
import { Link } from "react-router-dom"


export default class SalasLista extends Component {
    constructor(props) {
        super(props)
        this.estadoBuscaDescricao = this.estadoBuscaDescricao.bind(this)
        this.pegaSalas = this.pegaSalas.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaSala = this.ativaSala.bind(this)

        this.buscaDescricao = this.buscaDescricao.bind(this)
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)

        this.state = {
            salas: [],
            current: null,
            currentIndex: -1,
            buscaDescricao: ""
        }
    }

    componentDidMount() {
        this.pegaSalas()        
    }

    estadoBuscaDescricao(e) {
        const buscaDescricao = e.target.value
        this.buscaDescricao()
        this.limpaCurrent()
        this.setState({
            buscaDescricao: buscaDescricao
        })
    }

    limpaCurrent() {
        this.setState({
            current: null,
            currentIndex: -1,            
            buscaDescricao: ""            
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

    buscaDescricao() {
        SalaDataService.buscarDescricao(this.state.buscaDescricao)
        .then(response => {
            const salas = response.data 
            this.setState({
                salas: response.data                      
            })    
        })
        .catch(e => {
            console.log(e)
        })
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.current.id,
            descricao: this.state.current.descricao,            
            tipo: this.state.current.tipo,
            sigla: this.state.current.sigla,
            situacao: status
        }

        SalaDataService.editar(this.state.current.id, data)
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

    atualizaLista() {
        this.pegaSalas()
        this.limpaCurrent()
    }

    ativaSala(sala, index) {
        this.setState({
            current: sala,
            currentIndex: index
        })
    }

    render() {
        const { buscaDescricao, salas, current, currentIndex} = this.state

        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.descricao}    
                {<Link to={`/cadastros/salas/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}            
            </div>
        } 
        if (current === null || buscaDescricao === '') {            
            mostrar = 
            <div className="list-group">
           { salas && salas.map((sala, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaSala(sala, index)} 
                key={index} > 
                    {sala.descricao}
                    
                </div>
            ))}
            </div>
        }

        let autocomplete = null
        if (salas) {
            autocomplete = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome da sala"} 
                        onClick={this.buscaDescricao} 
                        onKeyUp={this.buscaDescricao} 
                        id="sala" 
                        name="sala" 
                        value={this.state.buscaDescricao} 
                        onChange={this.estadoBuscaDescricao}
                        autoComplete="off"
                        autoFocus /> 
                    </div>                                       
                </div>                                   
                    {mostrar}                                    
            </div>
        }  

        return (
            <div>
                <div className="list" style={{marginTop:60+'px'}}>
                    <div className="col-md-6">
                        <div className="adicionar">                  
                            <Link to={"/cadastros/salas/adicionar"}>Cadastrar</Link>
                        </div>
                        <h4>Salas de exames</h4>
                        {autocomplete}
                    </div>
                    <div className="col-md-3">
                        {current ? (
                        <div>
                            <h4> {current.descricao} </h4>
                            <hr/>
                            <div>                            
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}   
                                { current.situacao ? "Ativo" : "Inativo" }
                            </div>
                            <div>
                                <label>
                                    <strong>Tipo: </strong>
                                </label>{" "}
                                { current.tipo }
                            </div>
                            <div>
                                <label>
                                    <strong>Sigla: </strong>
                                </label>{" "}
                                { current.sigla }
                            </div>    
                            <div className="labels" style={{justifyContent: 'space-between'}}>
                                <Link to={"/cadastros/salas/" + current.id} className="badge badge-warning">
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
                    
                        ): (
                        <div>
                            <br />
                            <p>Clique em uma sala...</p>
                        </div>
                    )}
                    </div>
                </div>                
            </div>
        )
    }
}