import React, { Component } from 'react'
import PainelDataService from "../services/painel.service"
import { Link } from "react-router-dom"


export default class PainelLista extends Component {
    constructor(props) {
        super(props)
        this.estadoBuscaDescricao = this.estadoBuscaDescricao.bind(this)
        this.pegaPainel = this.pegaPainel.bind(this)
        this.atualizaLista = this.atualizaLista.bind(this)
        this.ativaPainel = this.ativaPainel.bind(this)

        this.buscaDescricao = this.buscaDescricao.bind(this)
        this.limpaCurrent = this.limpaCurrent.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)

        this.state = {
            paineis: [],
            current: null,
            currentIndex: -1,
            buscaDescricao: ""
        }
    }

    componentDidMount() {
        this.pegaPainel()        
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

    pegaPainel() {        
        PainelDataService.buscarTodos()
        .then(response => {
            this.setState({
                paineis: response.data
            })            
        })
        .catch(e => {
            console.log(e)
        })
    }

    buscaDescricao() {
        PainelDataService.buscarDescricao(this.state.buscaDescricao)
        .then(response => {
            
            this.setState({
                paineis: response.data                      
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
            cod: this.state.current.cod,
            situacao: status
        }

        PainelDataService.editar(this.state.current.id, data)
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
        this.pegaPainel()
        this.limpaCurrent()
    }

    ativaPainel(painel, index) {
        this.setState({
            current: painel,
            currentIndex: index
        })
    }


    render() {
        const { buscaDescricao, paineis, current, currentIndex} = this.state

        let mostrar = null
        if (current !== null) {
            mostrar =  <div className="autocomplete-items-active">
                {current.descricao}    
                {<Link to={`/cadastros/painel/${current.cod}`} id="editar" className="autocomplete-items">Editar</Link>}            
            </div>
        } 
        if (current === null || buscaDescricao === '') {            
            mostrar = 
            <div className="list-group">
           { paineis && paineis.map((painel, index) => (
                <div className={"autocomplete-items" + (index === currentIndex ? "-active" : "")} 
                onClick={() => this.ativaPainel(painel, index)} 
                key={index} > 
                    {painel.descricao}                    
                </div>
            ))}
            </div>
        }

        let autocomplete = null
        if (paineis) {
            autocomplete = 
            <div>
                <div className="actions">
                    <div className="autocomplete">
                        <input 
                        type="text"
                        className="autocomplete" 
                        placeholder={"Digite o nome do painel"} 
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
                            <Link to={"/cadastros/painel/adicionar"}>Cadastrar</Link>
                        </div>
                        <h4>Lista de Painéis</h4>
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
                                    <strong>Código: </strong>
                                </label>{" "}
                                { current.cod }
                            </div>    
                            <div className="labels" style={{justifyContent: 'space-between'}}>
                                <Link to={"/cadastros/painel/" + current.cod} className="badge badge-warning">
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
                            <p>Clique em um painel...</p>
                        </div>
                    )}
                    </div>
                </div>                
            </div>
        )
    }
}