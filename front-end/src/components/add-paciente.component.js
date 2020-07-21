import React, { Component } from 'react'
import PacienteDataService from "../services/paciente.service"
import Webcam from "react-webcam"
import * as moment from 'moment'

export default class AdicionarPaciente extends Component {
    constructor(props) {
        super(props)
        this.estadoNome = this.estadoNome.bind(this)
        this.estadoDtNascimento = this.estadoDtNascimento.bind(this)
        this.estadoCPF = this.estadoCPF.bind(this)
        this.estadoSexo = this.estadoSexo.bind(this)
        this.estadoTelefone = this.estadoTelefone.bind(this)
        this.estadoEmail = this.estadoEmail.bind(this)
        this.estadoRua = this.estadoRua.bind(this)
        this.estadoNum = this.estadoNum.bind(this)
        this.estadoComplemeto = this.estadoComplemeto.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)
       
        this.salvarImagem = this.salvarImagem.bind(this)
        this.salvarPaciente = this.salvarPaciente.bind(this)
        this.novoPaciente = this.novoPaciente.bind(this)

        this.capture = this.capture.bind(this)

        this.state = {
            id: null,
            nome: "",
            dtnascimento: "",
            cpf: "",
            sexo: "",
            telefone: "",
            email: "",
            rua: "",
            num: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            situacao: true,
            foto: "default.jpg",
            imagem: "",
            url:"",
            showModal: false,
            submitted: false
        }
    }

    estadoUpload(e) {
        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
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

    estadoNome(e) {
        this.setState({
            nome: e.target.value
        })
    }

    estadoDtNascimento(e) {
        this.setState({
            dtnascimento: e.target.value
        })
    }

    estadoCPF(e) {
        this.setState({
            cpf: e.target.value
        })
    }

    estadoSexo(e) {
        this.setState({
            sexo: e.target.value
        })
    }

    estadoTelefone(e) {
        this.setState({
            telefone: e.target.value
        })
    }

    estadoEmail(e) {
        this.setState({
            email: e.target.value
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

    
   salvarImagem() {
    
        if(this.state.foto === "default.jpg") {
            this.salvarPaciente()  
            return false
        }
        if(this.state.foto !== "default.jpg") {
        
            var data = new FormData()
            data.append('file', this.state.imagem)
        
                PacienteDataService.cadastrarImagem(data)
                            .then(response => {
                                this.setState({
                                    foto: response.data.foto
                                })
                                this.salvarPaciente()
                            })
                            .catch(e => {
                                console.log(e)
                            })
        }
    }

    salvarPaciente() {

        var data = {
            
            nome: this.state.nome,
            dtnascimento: moment(this.state.dtnascimento,'DD/MM/YYYY'),
            cpf: this.state.cpf,
            sexo: this.state.sexo,
            telefone: this.state.telefone,
            email: this.state.email,
            rua: this.state.rua,
            num: this.state.num,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            cep: this.state.cep,
            foto: this.state.imagem
        }

            PacienteDataService.cadastrar(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        nome: response.data.nome,
                        dtnascimento: response.data.dtnascimento,
                        cpf: response.data.cpf,
                        sexo: response.data.sexo,
                        telefone: response.data.telefone,
                        email: response.data.email,
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
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
    }

    novoPaciente() {
        this.setState({
        id: null,
        nome: "",
        dtnascimento: "",
        cpf: "",
        sexo: "",
        telefone: "",
        email:"",
        rua: "",
        num: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        situacao: true,
        foto: "",
        submitted: false
        })
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imagem: imageSrc
        })
        this.hideModal()
    }
    render() {
        
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        }

        let modalWebcam = null
        if (this.state.showModal === true) {
            modalWebcam = <div className="modal_bg">
                <div className="modal">
                    <button type="button" id="closeButton" onClick={this.hideModal}>X</button>
                    <div>
                        <h3>Foto do paciente</h3>
                        <Webcam     
                            className="camera"     
                            audio={false}         
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"          
                            videoConstraints={videoConstraints} />
                        <button id="capture" onClick={this.capture}>Capturar</button>
                    </div>
                </div>
            </div>
        }

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

        if (this.state.imagem) {
            $imagePreview = <img alt="" src={this.state.imagem} />
        }
/*
        //Verifica se a imagem possui mais de 2 MB
        if(this.state.imagem && (this.state.imagem.size > 2 * 1024 * 1024)){
            alert('Somente arquivos até 2MB')
        }
        //Verifica se é uma imagem
        if(this.state.imagem && this.state.imagem.type.substr(0,6) !== "image/" && this.state.imagem.type !== "") {
            alert('Somente imagens podem ser enviadas')
        } 
*/
    

        return (
            <div className="submit-form">
                { this.state.submitted ? (
                    <div>
                        <h4> Envio completado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.novoPaciente}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                <div>
                    <div className="col-5">
                        <div className="row">
                            <div className="form-group">
                                <div className="image-container">                                    
                                    <div className="imagem">
                                        {$imagePreview}
                                    </div>
                                    <div className="envio">
                                        <button type="button" onClick={this.showModal}>Webcam</button>
                                    </div>
                                    {modalWebcam}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="nome"> Nome </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="nome" 
                            required 
                            autoFocus
                            value={this.state.nome} 
                            onChange={this.estadoNome} 
                            name="nome" />
                        </div>
                        <div className="row">  
                            <div className="duplo" style={{marginTop: 10+'px', padding: 0}}>                          
                            <label htmlFor="dtnascimento"> Data de Nascimento </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="dtnascimento" 
                            required 
                            value={this.state.dtnascimento} 
                            onChange={this.estadoDtNascimento} 
                            name="dtnascimento" />                        
                            </div>
                            <div className="col-6" style={{marginTop: 10+'px',marginLeft: 18+'px', padding: 0}}>                        
                                <label htmlFor="cpf"> CPF </label>
                                <input 
                                type="number" 
                                className="form-control" 
                                id="cpf"                             
                                value={this.state.cpf} 
                                onChange={this.estadoCPF} 
                                name="cpf" />
                            </div>                        
                        </div>
                        <div className="row" style={{marginTop: 10+'px'}}>  
                        <label >Sexo</label>  
                            <div className="grupo-sexo" style={{padding: 4+'px'}}>                    
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        name="sexo"
                                        id="sexoFeminino"
                                        value="Feminino"
                                        checked={this.state.sexo === 'Feminino'}
                                        onChange={this.estadoSexo}
                                        style={{marginLeft: 5+'px'}} />
                                </div>
                                <label className="form-check-label">Feminino</label>

                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        name="sexo"
                                        id="sexoMasculino"
                                        value="Masculino"
                                        checked={this.state.sexo === 'Masculino'}
                                        onChange={this.estadoSexo} />
                                </div>
                                <label className="form-check-label">Masculino</label>                            
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4" style={{marginLeft: 0, marginTop: 10+'px', padding: 0}}>
                                <label htmlFor="telefone"> Telefone </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="telefone" 
                                value={this.state.telefone} 
                                onChange={this.estadoTelefone} 
                                name="telefone" />
                            </div>
                            <div className="col-7"  style={{marginLeft: 34+'px', marginTop: 10+'px', padding: 0}}>
                                <label htmlFor="email"> E-mail </label>
                                <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                value={this.state.email} 
                                onChange={this.estadoEmail} 
                                name="email" />
                            </div>                 
                        </div>
                    </div>
                    <div className="col-5">   
                        <div className="row">
                            <div className="actions">
                            </div>
                        </div>
                        
                        <div className="row">
                            <label htmlFor="rua"> Rua </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="rua" 
                            value={this.state.rua} 
                            onChange={this.estadoRua} 
                            name="rua" />
                        </div>                                            
                        <div className="row">
                            <label htmlFor="num"> Número </label>
                            <input type="text" 
                            className="form-control" 
                            id="num" 
                            value={this.state.num} 
                            onChange={this.estadoNum} 
                            name="num" />
                        </div>
                    
                        <div className="row">
                            <label htmlFor="complemento"> Complemento </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="complemento" 
                            value={this.state.complemento} 
                            onChange={this.estadoComplemeto} 
                            name="complemento" />
                        </div>
                    
                        <div className="row">
                            <label htmlFor="bairro"> Bairro </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="bairro" 
                            value={this.state.bairro} 
                            onChange={this.estadoBairro} 
                            name="bairro" />
                        </div>
                    
                        <div className="row" style={{marginTop: 10+'px'}}>
                            <label htmlFor="cidade"> Cidade </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="cidade" 
                            value={this.state.cidade} 
                            onChange={this.estadoCidade} 
                            name="cidade"  />
                        </div>
                    
                        <div className="row">
                            <div className="col-md-3" style={{marginTop: 10+'px', marginLeft: 4 +'px', padding: 0}}>
                                <label htmlFor="uf"> UF </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="uf" 
                                value={this.state.uf} 
                                onChange={this.estadoUf} 
                                name="uf" />                            
                            </div>                        
                            <div className="col-md-6" style={{marginLeft: 98+'px', marginTop: 10+'px', padding: 0}}>
                                <label htmlFor="cep"> CEP </label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="cep" 
                                value={this.state.cep} 
                                onChange={this.estadoCep} 
                                name="cep" />
                            </div>
                            <div className="row">
                            
                            <div className="adicionar" style={{marginTop: 25+'px', marginLeft: 10+'px', padding: 15+'px', width: 27+'em'}}>
                                <button onClick={this.salvarImagem} className="btn btn-success">
                                    Adicionar
                                </button>
                            </div>                            
                        </div>
                    </div>
                    
                    </div>
                </div>
                )}
            </div>
        )
    }
}