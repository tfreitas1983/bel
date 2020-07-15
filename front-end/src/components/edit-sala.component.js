import React, { Component } from 'react'
import SalaDataService from "../services/sala.service"

export default class Sala extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoSelectTipo = this.estadoSelectTipo.bind(this)
        this.estadoSigla = this.estadoSigla.bind(this)

        this.buscaSala = this.buscaSala.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.atualizaSala = this.atualizaSala.bind(this)

        this.state = {
            current: {
                id: null,
                descricao: "",
                tipo: "",
                selectedTipo: "",
                sigla: "",
                situacao: false
            },
              message: "",
        }
    }

    componentDidMount() {
        this.buscaSala(this.props.match.params.id)
    }

    buscaSala(id) {
        SalaDataService.buscar(id)
        .then(response => {
            this.setState({
                current: {
                    id: response.data.id,
                    descricao: response.data.descricao,
                    tipo: response.data.tipo,
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

    estadoTipo(e) {
        const tipo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                tipo : tipo
            }
        }))
    }

    estadoSelectTipo (e) {
        const selectedTipo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                tipo: selectedTipo
            }
        }))
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

    atualizaSala() {        
        var data = {
            id: this.state.current.id,
            descricao: this.state.current.descricao,
            tipo: this.state.current.tipo,
            sigla: this.state.current.sigla,
        }

        SalaDataService.editar( this.state.current.id, data )
        .then(response => {
            this.setState({
                message: "A sala foi alterada com sucesso"
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



    render() {

        const { current } = this.state

        return (
            <div>
            { current ? (
                <div className="edit-form">
                    <h4>Editar Sala: {current.descricao}</h4>
                    <form>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" className="form-control" id="descricao" value={current.descricao} onChange={this.estadoDescricao} />
                            </div> 

                            <div className="form-group">
                                <label htmlFor="tipo"> Tipo </label>
                                <select 
                                    className="form-control" 
                                    id="tipo"                                    
                                    value={current.tipo}                                                                      
                                    onChange={this.estadoSelectTipo}>                                    
                                    <option value="1" disabled>Selecione o tipo</option>
                                    <option value="Recepção">Recepção</option>  
                                    <option value="Sala de exames">Sala de exames</option>                            
                                </select>
                            </div>  
                        
                            <div className="form-group">
                                <label htmlFor="sigla">sigla</label>
                                <input type="text" className="form-control" id="sigla" value={current.sigla} onChange={this.estadoSigla} />
                            </div>                           
                        
                            <button type="submit" className="btn btn-success" onClick={this.atualizaSala}>
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
                            <p>Selecione uma sala...</p>
                        </div>
                    )}
                </div>
                )        
    }
}