import React, { Component } from 'react'
import ClinicaDataService from "../services/clinica.service"
import PacienteDataService from "../services/paciente.service"
import { Link } from "react-router-dom"


export default class Clinica extends Component {
    constructor(props) {
        super(props)
        this.estadoRazao = this.estadoRazao.bind(this)
        this.estadoFantasia = this.estadoFantasia.bind(this)
        this.estadoCNPJ = this.estadoCNPJ.bind(this)
        this.estadoInscricao = this.estadoInscricao.bind(this)
        this.estadoEmail = this.estadoEmail.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemento = this.estadoComplemento.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)

        this.buscaClinica = this.buscaClinica.bind(this)
        this.salvarImagem = this.salvarImagem.bind(this)
        this.atualizaClinica = this.atualizaClinica.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)

        this.state = {
            current: {
                id: null,
                razao: "",                
                fantasia: "",
                cnpj: "",
                inscricao: "",
                email: "",
                telefone: "",
                rua: "",
                num: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
                cep: "",
                foto: "",
                imagem: "logo.png",
                url: "",
                situacao: false
            },
                message: "",
        }
    }

    componentDidMount() {
        this.buscaClinica(this.props.match.params.id)
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. 
        //Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "logo.png", type: "image/jpeg"}
            const foto = "logo.png"
            const url = ""
            this.setState(prevState => ({
                imagem: imagem,
                url: url,
                foto: foto,
                current: {
                    ...prevState.current,
                        foto: foto
                }
            }))
        //Quando o usuário escolhe uma imagem a ser enviada
        } else {
            const imagem = e.target.files[0]
            const foto =  e.target.files[0].name
            
            this.setState(prevState => ({
                imagem: imagem,
                url: URL.createObjectURL(imagem),
                current: {
                    ...prevState.current,
                        foto: foto
                }
            }))
        }
    }

    estadoRazao(e) {
        const razao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                razao: razao
            }
        }))
    }

    estadoFantasia(e) {
        const fantasia = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                fantasia: fantasia
            }
        }))
    }

    estadoCNPJ(e) {
        const cnpj = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cnpj: cnpj
            }
        }))
    }

    estadoInscricao(e) {
        const inscricao = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                inscricao: inscricao
            }
        }))
    }

    estadoEmail(e) {
        const email = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                email: email
            }
        }))
    }


    estadoTelefone(e) {
        const telefone = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                telefone: telefone
            }
        }))
    }

    estadoRua(e) {
        const rua = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                rua: rua
            }
        }))
    }

    estadoNum(e) {
        const num = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                num: num
            }
        }))
    }

    estadoComplemento(e) {
        const complemento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                complemento: complemento
            }
        }))
    }

    estadoBairro(e) {
        const bairro = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                bairro: bairro
            }
        }))
    }
    
    estadoCidade(e) {
        const cidade = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cidade: cidade
            }
        }))
    }

    estadoUf(e) {
        const uf = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                uf: uf
            }
        }))
    }

    estadoCep(e) {
        const cep = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cep: cep
            }
        }))
    }

    buscaClinica(id) {
        ClinicaDataService.buscar(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        razao: response.data.razao,
                        fantasia: response.data.fantasia,
                        cnpj: response.data.cnpj,
                        inscricao: response.data.inscricao,
                        email: response.data.email,
                        telefone: response.data.telefone,
                        rua: response.data.rua,
                        num: response.data.num,
                        complemento: response.data.complemento,
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        uf: response.data.uf,
                        cep: response.data.cep,
                        foto: response.data.foto,
                        situacao: response.data.situacao                     
                    }
                })                
            })
            .catch(e => {
                console.log(e)
            })    
    }

    salvarImagem() {
        if(this.state.foto === "logo.png" || !this.state.url) {
            this.atualizaClinica()  
            return false
        } if(this.state.foto !== "logo.png") {
        var data = new FormData()
        data.append('file', this.state.imagem)
               
            PacienteDataService.cadastrarImagem(data)
                        .then(response => {
                            this.setState(prevState => ({
                                current: {
                                    ...prevState.current,
                                    foto: response.data.foto
                                }
                            }))
                            this.atualizaClinica()
                        })
                        .catch(e => {
                            console.log(e)
                        })
       }
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.current.id,
            razao: this.state.current.razao,
            fantasia:this.state.current.fantasia,
            cnpj: this.state.current.cnpj,
            inscricao: this.state.current.inscricao,
            email: this.state.current.email,
            telefone: this.state.current.telefone,
            rua: this.state.current.rua,
            num: this.state.current.num,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: this.state.current.cidade,
            uf: this.state.current.uf,
            cep: this.state.current.cep,
            foto: this.state.current.foto,
            situacao: status
        }

        ClinicaDataService.editar(this.state.current.id, data)
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

    atualizaClinica() {
        
        var data = {
            id: this.state.current.id,
            razao: this.state.current.razao,
            fantasia:this.state.current.fantasia,
            cnpj: this.state.current.cnpj,
            inscricao: this.state.current.inscricao,
            email: this.state.current.email,
            telefone: this.state.current.telefone,
            rua: this.state.current.rua,
            num: this.state.current.num,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: this.state.current.cidade,
            uf: this.state.current.uf,
            cep: this.state.current.cep,
            foto: this.state.current.foto
        }

        ClinicaDataService.editar( this.state.current.id, data )
            .then(response => {
                this.setState({
                    message: "A clínica foi alterada com sucesso"
                })

            })
            .catch(e => {
                console.log(e)
            })
    }    



    render() {

        const { current } = this.state


        //Monta um array com os nomes dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});

        // Constante que pega todas as imagens da pasta images
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url && current.foto !== "logo.png") {
            $imagePreview = <img alt="" src={this.state.url} />
        } if((current.foto.length > 30 || current.foto === "logo.png") && !this.state.url) {
            $imagePreview = <img alt="" src={images[current.foto]} />
        }

        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 


        return (

        <div>
            { current ? (
                <div className="edit-form">
                    <h4>Editar Clínica</h4>
                    <form>
                        <div className="image-container">

                            <div className="imagem">
                                {$imagePreview}
                            </div>
                            
                            <div className="envio">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="upload-btn"
                                    onChange={this.estadoUpload} 
                                /> 
                            </div>

                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="razao">Razão Social</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="razao" 
                                value={current.razao} 
                                onChange={this.estadoRazao} />
                        </div>    

                        <div className="form-group">
                            <label htmlFor="fantasia">Nome Fantasia</label>
                            <input
                            className="form-control"
                            id="fantasia"
                            value={current.fantasia}
                            onChange={this.estadoFantasia} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                            type="number"
                            className="form-control"
                            id="cnpj"
                            value={current.cnpj}
                            onChange={this.estadoCNPJ} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="inscricao">Inscrição Municipal</label>
                            <input
                            className="form-control"
                            id="inscricao"
                            value={current.inscricao}
                            onChange={this.estadoInscricao} />
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={current.email}
                            onChange={this.estadoEmail} />                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="telefone" 
                                value={current.telefone} 
                                onChange={this.estadoTelefone} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rua">Rua</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="rua" 
                                value={current.rua} 
                                onChange={this.estadoRua} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="num">Número</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="num" 
                                value={current.num} 
                                onChange={this.estadoNum} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="complemento">Complemento</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="complemento" 
                                value={current.complemento} 
                                onChange={this.estadoComplemento} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="bairro" 
                                value={current.bairro} 
                                onChange={this.estadoBairro} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cidade" 
                                value={current.cidade} 
                                onChange={this.estadoCidade} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uf">UF</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="uf" 
                                value={current.uf} 
                                onChange={this.estadoUf} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cep">CEP</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cep" 
                                value={current.cep} 
                                onChange={this.estadoCep} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="situacao">
                                <strong> Situação:  </strong>
                            </label>
                            {current.situacao ? " Ativo" : " Inativo"}
                        </div>
        
                        </div>        
            </form>
            <div className="col-md-6">
                {current.situacao ? (
                    <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(false)}>
                        Inativar
                    </button>
                ) : (
                    <button className="badge badge-primary mr-2" onClick={() => this.atualizaSituacao(true)}>
                        Ativar
                    </button>
                )}

                <button type="submit" className="badge badge-success mr-2" onClick={this.salvarImagem}>
                        Alterar
                </button>
                
                <p>{this.state.message}</p>
            </div>
        </div>

        

        ) : (
                <div>
                    <br />
                    <p>Selecione a clínica...</p>
                </div>
            )}
        </div>
        )
    }
}