import React, { Component } from 'react'
import ClinicaDataService from "../services/clinica.service"
import { Link } from "react-router-dom"


export default class ClinicaLista extends Component {
    constructor(props) {
        super(props)
        this.pegaClinica = this.pegaClinica.bind(this)
        this.ativaClinica = this.ativaClinica.bind(this)

        this.state = {
            clinica: [],
            current: null,
            currentIndex: -1,
            buscaSituacao: ""
        }
    }

    componentDidMount() {
        this.pegaClinica()
    }


    pegaClinica() {
        ClinicaDataService.buscarTodos()
        .then(response => {
            this.setState({
                clinica: response.data
            })            
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    ativaClinica(clinica, index) {
        this.setState({
            current: clinica,
            currentIndex: index
        })
    }


    render() {

        const { clinica, current, currentIndex } = this.state
        
        let titulo = null
        if (clinica.length > 0) {
            titulo = <h4>Detalhes da clínica </h4>
        } else {
            titulo =  <Link to={"/cadastros/clinica/adicionar"} className="btn btn-info">Cadastrar</Link>
        }

        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpe?g|svg)$/))

        return (
            <div className="list row">
                <div className="col-md-6">

                    {titulo}
                    
                    <ul className="list-group">
                        {clinica && clinica.map((clinica, index) => (
                            <li 
                                className={"list-group-item " + (index === currentIndex ? "active" : "")} 
                                onClick={() => this.ativaClinica(clinica, index)} 
                                key={index} >
                                    {clinica.fantasia}{<Link to={`/cadastros/clinica/${clinica.id}`} id="editar" className="badge badge-warning">Editar</Link>}
                            </li>
                        )) }
                    </ul>
                </div>

                <div className="col-md-5">
                    {current ? (
                        <div>

                            <img 
                                src={images[current.foto]}
                                className="imagem"
                                alt=""
                                name="foto" 
                                id="foto"
                            />

                            <div>
                                <label>
                                    <strong>Razão Social: </strong>
                                </label>{" "}
                                    { current.razao }
                            </div>

                            <div>
                                <label>
                                    <strong>Nome Fantasia: </strong>
                                </label>{" "}
                                    { current.fantasia }
                            </div>

                            <div>
                                <label>
                                    <strong>CNPJ: </strong>
                                </label>{" "}
                                    { current.cnpj }
                            </div>

                            <div>
                                <label>
                                    <strong>Inscrição Municipal: </strong>
                                </label>{" "}
                                    { current.inscricao }
                            </div>

                            <div>
                                <label>
                                    <strong>E-mail: </strong>
                                </label>{" "}
                                    { current.email }
                            </div>

                            <div>
                                <label>
                                    <strong>Telefone: </strong>
                                </label>{" "}
                                    { current.telefone }
                            </div>

                            <div>
                                <label>
                                    <strong>Rua: </strong>
                                </label>{" "}
                                    { current.rua }
                            </div>

                            <div>
                                <label>
                                    <strong>Número: </strong>
                                </label>{" "}
                                    { current.num }
                            </div>

                            <div>
                                <label>
                                    <strong>Complemento: </strong>
                                </label>{" "}
                                    { current.complemento }
                            </div>

                            <div>
                                <label>
                                    <strong>Bairro: </strong>
                                </label>{" "}
                                    { current.bairro }
                            </div>

                            <div>
                                <label>
                                    <strong>Cidade: </strong>
                                </label>{" "}
                                    { current.cidade }
                            </div>

                            <div>
                                <label>
                                    <strong>UF: </strong>
                                </label>{" "}
                                    { current.uf }
                            </div>

                            <div>
                                <label>
                                    <strong>CEP: </strong>
                                </label>{" "}
                                    { current.cep }
                            </div>

                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}   
                                { current.situacao ? "Ativo" : "Inativo" }
                            </div>

                            <Link to={"/cadastros/clinica/" + current.id} className="badge badge-warning">
                                    Editar
                            </Link>
                        </div>
                        ) : (
                            <div>
                                <br />
                                <p>Clique na clínica para exibir os detalhes...</p>
                            </div>
                        )
                    }
                </div>
            </div>   
        )
    }
}