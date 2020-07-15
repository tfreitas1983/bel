import React, { Component } from 'react'
import ClinicaDataService from "../services/clinica.service"
import PacienteDataService from "../services/paciente.service"

export default class AdicionarClinica extends Component {
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
        this.estadoComplemeto = this.estadoComplemeto.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)

        this.salvarClinica = this.salvarClinica.bind(this)
        this.novaClinica = this.novaClinica.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)
        this.salvarImagem = this.salvarImagem.bind(this)

        this.state = {
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
            situacao: true,
            foto: "logo.png",
            imagem: "",
            url:"",
            submitted: false
        }
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "logo.png", type: "image/jpeg"}
            const foto = "logo.png"
            const url = ""
            this.setState({
                imagem: imagem,
                url: url,
                foto: foto
            })
        }
        //Quando o usuário escolhe uma imagem a ser enviada
        else {
            const imagem = e.target.files[0]
            this.setState({
                imagem: imagem,
                url: URL.createObjectURL(imagem)          
            })
        }
    }

    estadoRazao(e) {
        this.setState({
            razao: e.target.value
        })
    }

    estadoFantasia(e) {
        this.setState({
            fantasia: e.target.value
        })
    }

    estadoCNPJ(e) {
        this.setState({
            cnpj: e.target.value
        })
    }

    estadoInscricao(e) {
        this.setState({
            inscricao: e.target.value
        })
    }

    estadoEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    estadoTelefone(e) {
        this.setState({
            telefone: e.target.value
        })
    }

    estadoRua(e) {
        this.setState({
            rua: e.target.value
        })
    }

    estadoNum(e) {
        this.setState({
            num: e.target.value
        })
    }

    estadoComplemeto(e) {
        this.setState({
            complemento: e.target.value
        })
    }

    estadoBairro(e) {
        this.setState({
            bairro: e.target.value
        })
    }

    estadoCidade(e) {
        this.setState({
            cidade: e.target.value
        })
    }

    estadoUf(e) {
        this.setState({
            uf: e.target.value
        })
    }

    estadoCep(e) {
        this.setState({
            cep: e.target.value
        })
    }

    salvarClinica() {

        var data = {
            
            razao: this.state.razao,
            fantasia: this.state.fantasia,
            cnpj: this.state.cnpj,
            inscricao: this.state.inscricao,
            email: this.state.email,
            telefone: this.state.telefone,
            rua: this.state.rua,
            num: this.state.num,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            cep: this.state.cep,
            foto: this.state.foto
        }

            ClinicaDataService.cadastrar(data)
                .then(response => {
                    this.setState({
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
                        situacao: response.data.situacao,
                        submitted: true
                    })                    
                })
                .catch(e => {
                    console.log(e)
                })
    }

    salvarImagem() {
    
        if(this.state.foto === "logo.png") {
            this.salvarTemplo()  
            return false
        } if(this.state.foto !== "logo.png") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
                PacienteDataService.cadastrarImagem(data)
                            .then(response => {
                                this.setState({
                                    foto: response.data.foto
                                })
                                this.salvarClinica()
                            })
                            .catch(e => {
                                console.log(e)
                            })
        }
    }

    novaClinica() {
        this.setState({
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
        situacao: true,
        foto: "logo.png",
        submitted: false
        })
    }


    render() {

        //Monta um array com o nome dos arquivos
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {});
        //No array somente aceita as extensões de imagens
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null;
        if (this.state.url) {
            $imagePreview = <img alt="" src={this.state.url} />
        }
        if(!this.state.url) {
            $imagePreview = <img alt="" src={images[this.state.foto]} />
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
           <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novaClinica}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                
                    <div>

                        <div className="form-group">

                            <div className="image-container">

                                <div className="envio">
                                    {$imagePreview}
                                </div>

                                <div className="envio">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="file"
                                        onChange={this.estadoUpload}
                                        id="file"
                                        name="file"
                                    /> 
                                </div>

                            </div>

                            <div className="form-group">
                                <label htmlFor="razao"> Razão Social </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="razao" 
                                required 
                                value={this.state.razao} 
                                onChange={this.estadoRazao} 
                                name="razao" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="fantasia"> Nome Fantasia </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fantasia" 
                                    required 
                                    value={this.state.fantasia} 
                                    onChange={this.estadoFantasia} 
                                    name="fantasia" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cnpj"> CNPJ </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cnpj" 
                                    value={this.state.cnpj} 
                                    onChange={this.estadoCNPJ} 
                                    name="cnpj" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inscricao"> Inscrição Municipal </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inscricao" 
                                    value={this.state.inscricao} 
                                    onChange={this.estadoInscricao} 
                                    name="inscricao" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"> E-mail </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    value={this.state.email} 
                                    onChange={this.estadoEmail} 
                                    name="email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefone"> Telefone </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="telefone" 
                                    value={this.state.telefone} 
                                    onChange={this.estadoTelefone} 
                                    name="telefone" />
                            </div>
                    
                            <div className="form-group">
                                <label htmlFor="rua"> Rua </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="rua" 
                                    value={this.state.rua} 
                                    onChange={this.estadoRua} 
                                    name="rua" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="num"> Número </label>
                                <input type="text" 
                                    className="form-control" 
                                    id="num" 
                                    value={this.state.num} 
                                    onChange={this.estadoNum} 
                                    name="num" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="complemento"> Complemento </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="complemento" 
                                    value={this.state.complemento} 
                                    onChange={this.estadoComplemeto} 
                                    name="complemento" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="bairro"> Bairro </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="bairro" 
                                    value={this.state.bairro} 
                                    onChange={this.estadoBairro} 
                                    name="bairro" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="cidade"> Cidade </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cidade" 
                                    value={this.state.cidade} 
                                    onChange={this.estadoCidade} 
                                    name="cidade" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="uf"> UF </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="uf" 
                                    value={this.state.uf} 
                                    onChange={this.estadoUf} 
                                    name="uf" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="cep"> CEP </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="cep" 
                                    value={this.state.cep} 
                                    onChange={this.estadoCep} 
                                    name="cep" />
                            </div>
                        </div>
                        
                        <button onClick={this.salvarClinica} className="btn btn-success">
                            Adicionar
                        </button>
                    </div>
                    )            
                }
            </div>
        )
    }
}