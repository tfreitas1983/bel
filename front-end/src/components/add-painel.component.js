import React, { Component } from 'react'
import PainelDataService from "../services/painel.service"



export default class AdicionarPainel extends Component {
    constructor(props) {
        super(props)
        this.estadoDescricao = this.estadoDescricao.bind(this)
        this.estadoCod = this.estadoCod.bind(this)

        this.salvarPainel = this.salvarPainel.bind(this)
        this.novoPainel = this.novoPainel.bind(this)

        this.state = {
            id: null,
            descricao: "",
            cod: "",
            situacao: true,
            submitted: false
        }
    }

    estadoDescricao(e) {
        this.setState({
            descricao: e.target.value
        })
    }

    estadoCod(e) {
        this.setState({
            cod: e.target.value
        })
    }

    salvarPainel() {
        var data = {
            descricao: this.state.descricao,                        
            cod: this.state.cod
        }

        PainelDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                descricao: response.data.descricao, 
                cod: response.data.cod,             
                situacao: response.data.situacao,
                submitted: true
                })
                console.log(response.data)
            })
        .catch (e => {
            console.log(e)
        })        
    }

    novoPainel() {
        this.setState({
            id: null,
            descricao: "",
            cod: "",            
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
                <h4>Adicionar Painel</h4>
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
                    <label htmlFor="cod"> Código </label>
                    <input 
                    type="number" 
                    className="form-control" 
                    id="cod" 
                    required                     
                    value={this.state.cod} 
                    onChange={this.estadoCod} 
                    name="cod" />
                </div>
                
                <button onClick={this.salvarPainel} className="btn btn-success">
                    Adicionar
                </button>
            </div>
            )
        }
        </div>    
        )
    }
}