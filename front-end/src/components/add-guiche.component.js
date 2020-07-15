import React, { Component } from 'react'
import GuicheDataService from "../services/guiche.service"

export default class AdicionarGuiche extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoSigla = this.estadoSigla.bind(this)

        this.salvarGuiche = this.salvarGuiche.bind(this)
        this.novoGuiche = this.novoGuiche.bind(this)

        this.state = {
            id: null,
            descricao: "",
            sigla: "",
            situacao: true,
            submitted: false
        }
    }

    estadoDescricao(e) {
        this.setState({
            descricao: e.target.value
        })
    }

    estadoSigla(e) {
        this.setState({
            sigla: e.target.value
        })
    }

    salvarGuiche() {
        var data = {
            descricao: this.state.descricao,            
            sigla: this.state.sigla,
        }

        GuicheDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                descricao: response.data.descricao,
                sigla: response.data.sigla,
                situacao: response.data.situacao,
                submitted: true
                })
                console.log(response.data)
            })
        .catch (e => {
            console.log(e)
        })        
    }

    novoGuiche() {
        this.setState({
            id: null,
            descricao: "",
            sigla: "",            
            situacao: true,        
            submitted: false
        })
    }


    render() {
        return (
            <div className="submit-form" style={{marginTop: 80+'px', display: 'flex', justifyContent: 'center', width:20+'vw'}}>
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novoPaciente}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                <div>
                    <h4>Adicionar Guichê</h4>
                    <div className="form-group">
                        <label htmlFor="descricao"> Descrição </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="descricao" 
                        required 
                        autoFocus
                        value={this.state.descricao} 
                        onChange={this.estadoDescricao} 
                        name="descricao" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sigla"> Sigla </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="sigla" 
                        value={this.state.sigla} 
                        onChange={this.estadoSigla} 
                        name="sigla" />
                    </div>
                    <button onClick={this.salvarGuiche} className="btn btn-success">
                        Adicionar
                    </button>
                </div>
                )
            }
            </div>     
        )
    }
}