import React, { Component } from 'react'
import PainelDataService from "../services/painel.service"

export default class Painel extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)       
        this.estadoCod = this.estadoCod.bind(this)
       
        this.buscaPainel = this.buscaPainel.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.atualizaPainel = this.atualizaPainel.bind(this)

        this.state = {
            current: {
                id: null,
                descricao: "",
                situacao: false
            },
              message: "",
        }
    }

    componentDidMount() {
        this.buscaPainel(this.props.match.params.id)
}

    buscaPainel(cod) {
        PainelDataService.buscar(cod)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    descricao: response.data.descricao,
                    cod: response.data.cod,
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

    estadoCod(e) {
        const cod = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cod : cod
            }
        }))
    }

    atualizaPainel() {        
        var data = {
            id: this.state.current.id,
            descricao: this.state.current.descricao,            
            cod: this.state.current.cod,
        }

        PainelDataService.editar( this.state.current.id, data )
        .then(response => {
            this.setState({
                message: "O painel foi alterado com sucesso"
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
            painel: this.state.current.painel,
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



    render() {

        const { current } = this.state

        return (
            <div>
            { current ? (
                <div className="edit-form">
                    <h4>Editar Painel: {current.descricao}</h4>
                    <form>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" value={current.descricao} onChange={this.estadoDescricao} />
                            </div> 

                                                    
                            <div className="form-group">
                                <label htmlFor="cod"> Código </label>
                                <input type="text" className="form-control" id="cod" value={current.cod} onChange={this.estadoCod} />
                            </div>                           
                        
                            <button type="submit" className="btn btn-success" onClick={this.atualizaPainel}>
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
                            <p>Selecione um painel...</p>
                        </div>
                    )}
                </div>
        )
    }
}