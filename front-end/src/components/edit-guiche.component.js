import React, { Component } from 'react'
import GuicheDataService from "../services/guiche.service"


export default class Guiche extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)       
        this.estadoSigla = this.estadoSigla.bind(this)

        this.buscaGuiche = this.buscaGuiche.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.atualizaGuiche = this.atualizaGuiche.bind(this)

        this.state = {
            current: {
                id: null,
                descricao: "",
                sigla: "",
                situacao: false
            },
              message: "",
        }
    }

    componentDidMount() {
        this.buscaGuiche(this.props.match.params.id)
    }

    buscaGuiche(id) {
        GuicheDataService.buscar(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    descricao: response.data.descricao,
                    sigla: response.data.sigla,
                    situacao: response.data.situacao                     
                }
            })
        })
        .catch(e => {
            console.log(e)
        })    
    }

    estadoDescricao(e) {
        const descricao = e.target.value
        this.setState(function(prevState) {
            return {
                current: {
                    ...prevState.current,
                    descricao: descricao
                }
            }
        })
    }

    estadoSigla(e) {
        const sigla = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                sigla : sigla
            }
        }))
    }

    atualizaGuiche() {        
        var data = {
            id: this.state.current.id,
            descricao: this.state.current.descricao,            
            sigla: this.state.current.sigla,
        }

        GuicheDataService.editar( this.state.current.id, data )
        .then(response => {
            this.setState({
                message: "O guichê foi alterado com sucesso"
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


    render() {
        const { current } = this.state

        return (
            <div>
            { current ? (
                <div className="edit-form">
                    <h4>Editar Guichê: {current.descricao}</h4>
                    <form>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" value={current.descricao} onChange={this.estadoDescricao} />
                            </div> 

                                                    
                            <div className="form-group">
                                <label htmlFor="sigla">sigla</label>
                                <input type="text" className="form-control" id="sigla" value={current.sigla} onChange={this.estadoSigla} />
                            </div>                           
                        
                            <button type="submit" className="btn btn-success" onClick={this.atualizaGuiche}>
                                Alterar
                            </button>
                            <b style={{marginLeft: 2+'em'}}>{this.state.message}</b>
                        </div>
                        
                        <div className="form-group" style={{marginTop: 15+'px'}}>
                            <label htmlFor="situacao">
                                <strong> Situação:  </strong>
                            </label>
                            {current.situacao ? " Ativo" : " Inativo"}
                        </div>
              
                        {current.situacao ? (
                            <button className="btn btn-danger mr-2" onClick={() => this.atualizaSituacao(false)}>
                                Inativar
                            </button>
                        ) : (
                            <button className="btn btn-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                                Ativar
                            </button>
                        )}                                  
                    </form>
                </div>
                ) : (
                        <div>
                            <br />
                            <p>Selecione um guichê...</p>
                        </div>
                    )}
                </div>
        )
    }
}