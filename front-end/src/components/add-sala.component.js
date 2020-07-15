import React, { Component } from 'react'
import SalaDataService from "../services/sala.service"


export default class AdicionarSala extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoTipo = this.estadoTipo.bind(this)
        this.estadoSigla = this.estadoSigla.bind(this)

        this.salvarSala = this.salvarSala.bind(this)
        this.novaSala = this.novaSala.bind(this)

        this.state = {
            id: null,
            descricao: "",
            tipo: "",
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

    estadoTipo(e) {
        this.setState({
            tipo: e.target.value
        })
    }

    estadoSigla(e) {
        this.setState({
            sigla: e.target.value
        })
    }

    salvarSala() {
        var data = {
            descricao: this.state.descricao,
            tipo:this.state.tipo,
            sigla: this.state.sigla,
        }

        SalaDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                descricao: response.data.descricao,
                tipo: response.data.tipo,
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

    novaSala() {
        this.setState({
            id: null,
            descricao: "",
            sigla: "",
            tipo:"",
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
                    <h4>Adicionar Sala</h4>
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
                        <label htmlFor="tipo"> Tipo </label>
                        <select 
                            className="form-control" 
                            id="tipo" 
                            name="tipo"
                            value={this.state.tipo}                                    
                            onChange={this.estadoTipo}>                                    
                            <option value="1">Selecione o tipo</option>
                            <option value="Recepção">Recepção</option>  
                            <option value="Sala de exames">Sala de exames</option>                            
                        </select>
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
                    <button onClick={this.salvarSala} className="btn btn-success">
                        Adicionar
                    </button>
                </div>
                )
            }
            </div>            
        )
    }
}