import React, { Component } from 'react'
import GuicheDataService from "../services/guiche.service"
import { Link } from "react-router-dom"


export default class GuichesLista extends Component {
    constructor(props) {
        super(props)
        this.estadoBuscaDescricao = this.estadoBuscaDescricao.bind(this)
        this.pegaGuiches = this.pegaGuiches.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaGuiche = this.ativaGuiche.bind(this)

        this.buscaDescricao = this.buscaDescricao.bind(this)
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)

        this.state = {
            guiches: [],
            current: null,
            currentIndex: -1,
            buscaDescricao: ""
        }
    }

    componentDidMount() {
        this.pegaGuiches()        
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

    buscaDescricao() {
        GuicheDataService.buscarDescricao(this.state.buscaDescricao)
        .then(response => {
            const guiches = response.data 
            this.setState({
                guiches: response.data                      
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
            sigla: this.state.current.sigla,
            situacao: status
        }

        GuicheDataService.editar(this.state.current.id, data)
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
        this.pegaGuiches()
        this.limpaCurrent()
    }

    ativaGuiche(guiche, index) {
        this.setState({
            current: guiche,
            currentIndex: index
        })
    }



    render() {

        const { buscaDescricao, guiches, current, currentIndex} = this.state

        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.descricao}    
                {<Link to={`/cadastros/guiches/${current.id}`} id="editar" className="autocomplete-items">Editar</Link>}            
            </div>
        } 
        if (current === null || buscaDescricao === '') {            
            mostrar = 
            <div className="list-group">
           { guiches && guiches.map((guiche, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaGuiche(guiche, index)} 
                key={index} > 
                    {guiche.descricao}
                    
                </div>
            ))}
            </div>
        }

        let autocomplete = null
        if (guiches) {
            autocomplete = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome do guichê"} 
                        onClick={this.buscaDescricao} 
                        onKeyUp={this.buscaDescricao} 
                        id="guiche" 
                        name="guiche" 
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
                            <Link to={"/cadastros/guiches/adicionar"}>Cadastrar</Link>
                        </div>
                        <h4>Lista de Guichês de recepção</h4>
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
                                    <strong>Sigla: </strong>
                                </label>{" "}
                                { current.sigla }
                            </div>    
                            <div className="labels" style={{justifyContent: 'space-between'}}>
                                <Link to={"/cadastros/guiches/" + current.id} className="badge badge-warning">
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
                            <p>Clique em um guichê...</p>
                        </div>
                    )}
                    </div>
                </div>                
            </div>
        )
    }
}