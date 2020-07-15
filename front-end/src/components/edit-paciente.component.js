import React, { Component } from 'react'
import PacienteDataService from "../services/paciente.service"
import * as moment from 'moment'

export default class Paciente extends Component {
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
        this.estadoComplemento = this.estadoComplemento.bind(this)
        this.estadoBairro = this.estadoBairro.bind(this)
        this.estadoCidade = this.estadoCidade.bind(this)
        this.estadoUf = this.estadoUf.bind(this)
        this.estadoCep = this.estadoCep.bind(this)
        this.estadoUpload = this.estadoUpload.bind(this)

        this.salvarImagem = this.salvarImagem.bind(this)
        this.buscaPaciente = this.buscaPaciente.bind(this)
        this.atualizaSituacao = this.atualizaSituacao.bind(this)
        this.atualizaPaciente = this.atualizaPaciente.bind(this)
        
        this.state = {
            current: {
                id: null,
                nome: "",                
                dtnascimento: moment(),
                dtnascimentonovo: "",
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
                foto: "",
                imagem: "",
                url: "",
                situacao: false
              },
                message: "",
        }
    }    

    componentDidMount() {
        this.buscaPaciente(this.props.match.params.id)
    }

    estadoUpload(e) {
   

        //Verifica se o usuário escolheu e depois cancelou a escolha do arquivo. 
        //Assim a imagem volta a ser a padrão
        if(!e.target.files[0]){
            const imagem = {name: "default.jpg", type: "image/jpeg"}
            const foto = "default.jpg"
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
            
    estadoNome(e) {
        const nome = e.target.value
        this.setState(function(prevState) {
            return {
                current: {
                    ...prevState.current,
                    nome: nome
                }
            }
        })
    }

    estadoDtNascimento(e) {
        const dtnascimento = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtnascimento: dtnascimento
            }
        }))
    }

    estadoDtNascimentoNovo(e) {
        const dtnascimentonovo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                 dtnascimento: dtnascimentonovo
            }
        }))
    }

    estadoCPF(e) {
        const cpf = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                cpf : cpf
            }
        }))
    }

    estadoSexo(e) {
        const sexo = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                sexo : sexo
            }
        }))
    }

    estadoEmail(e) {
        const email = e.target.value
        this.setState(prevState => ({
            current: {
                ...prevState.current,
                email : email
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

    buscaPaciente(id) {
        PacienteDataService.buscarUm(id)
            .then(response => {
                this.setState({
                    current: {
                        id: response.data.id,
                        nome: response.data.nome,
                        dtnascimento: moment(response.data.dtnascimento).format('DD/MM/YYYY'),
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
                        situacao: response.data.situacao                     
                    }
                })
            })
            .catch(e => {
                console.log(e)
            })    
    }

    salvarImagem() {
        if(this.state.foto === "default.jpg" || !this.state.url) {
            this.atualizaPaciente()  
            return false
        } if(this.state.foto !== "default.jpg") {
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
                            this.atualizaPaciente()
                        })
                        .catch(e => {
                            console.log(e)
                        })
       }
    }

    atualizaSituacao(status) {
        var data = {
            id: this.state.current.id,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento, 'DD-MM-YYYY'),
            cpf: this.state.current.cpf,
            sexo: this.state.current.sexo,
            telefone: this.state.current.telefone,
            email: this.state.current.email,            
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

        PacienteDataService.editar(this.state.current.id, data)
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

    atualizaPaciente() {        
        var data = {
            id: this.state.current.id,
            nome: this.state.current.nome,
            dtnascimento: moment(this.state.current.dtnascimento, 'DD-MM-YYYY'),
            cpf: this.state.current.cpf,
            sexo: this.state.current.sexo,
            telefone: this.state.current.telefone,
            email: this.state.current.email,
            rua: this.state.current.rua,
            num: this.state.current.num,
            complemento: this.state.current.complemento,
            bairro: this.state.current.bairro,
            cidade: this.state.current.cidade,
            uf: this.state.current.uf,
            cep: this.state.current.cep,
            foto: this.state.current.foto
        }

        PacienteDataService.editar( this.state.current.id, data )
            .then(response => {
                this.setState({
                    message: "O(a) paciente foi alterado com sucesso"
                })

            })
            .catch(e => {
                console.log(e)
            })
    }    
   

    render() {
        const { current } = this.state


        //Monta um array com os nomes dos arquivos da pasta imagens
        const importAll = require =>
          require.keys().reduce((acc, next) => {
            acc[next.replace("./", "")] = require(next);
            return acc;
          }, {})

        // Constante que pega todas as imagens da pasta images
        const images = importAll(require.context('../images', false, /\.(png|gif|tiff|jpeg|jpg|svg|JPG|PNG|GIF|TIFF|JPEG|SVG)$/))
        
        
        //Modifica o <img src=""> no JSX caso seja o preview da imagem ou a imagem da pasta
        let $imagePreview = null
        if (this.state.url && current.foto !== "default.jpg") {
            $imagePreview = <img alt="" src={this.state.url} />
        } if((current.foto.length > 30 || current.foto === "default.jpg") && !this.state.url) {
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
                    <h4>Editar Paciente: {current.nome}</h4>
                    <form>
                        <div className="col-md-6">
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

                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" value={current.nome} onChange={this.estadoNome} />
                        </div>    
                        <div className="row">
                            <div className="duplo" style={{marginTop: 0, marginLeft: 15+'px',padding: 0}}>
                                <label htmlFor="dtnascimento">Data de nascimento</label>
                                <input
                                className="form-control"
                                id="dtnascimento"
                                value={current.dtnascimento}
                                onChange={this.estadoDtNascimentoNovo} />
                                
                            </div>

                            <div className="col-7" style={{marginTop: 0, padding: 0}}>
                                <label htmlFor="cpf">CPF</label>
                                <input
                                type="number"
                                className="form-control"
                                id="cpf"
                                value={current.cpf}
                                onChange={this.estadoCPF} />                            
                            </div>
                        </div>
                        <label style={{marginTop: 20+'px'}}> Sexo </label>
                        <div className="grupo-sexo">
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoFeminino"
                                    value="Feminino"
                                    checked={current.sexo === 'Feminino'}
                                    onChange={this.estadoSexo} />
                            </div>
                            <label className="form-check-label">Feminino</label>

                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    id="sexoMasculino"
                                    value="Masculino"
                                    checked={current.sexo === 'Masculino'}
                                    onChange={this.estadoSexo} />
                            </div>
                            <label className="form-check-label">Masculino</label>
                        </div>
                        <div className="row">
                            <div className="duplo">
                                <label htmlFor="telefone">Telefone</label>
                                <input type="text" className="form-control" id="telefone" value={current.telefone} onChange={this.estadoTelefone} />
                            </div>
                            <div className="col-7">
                                <label htmlFor="email">E-mail</label>
                                <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={current.email}
                                onChange={this.estadoEmail} />                            
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success" onClick={this.salvarImagem}>
                            Alterar
                        </button>
                        <b style={{marginLeft: 2+'em'}}>{this.state.message}</b>
                        </div>
                        <div className="col-md-5">                            
                            <div className="form-group" style={{marginTop: 53+'px'}}>
                                <label htmlFor="rua">Rua</label>
                                <input type="text" className="form-control" id="rua" value={current.rua} onChange={this.estadoRua} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="num">Número</label>
                                <input type="text" className="form-control" id="num" value={current.num} onChange={this.estadoNum} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="complemento">Complemento</label>
                                <input type="text" className="form-control" id="complemento" value={current.complemento} onChange={this.estadoComplemento} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bairro">Bairro</label>
                                <input type="text" className="form-control" id="bairro" value={current.bairro} onChange={this.estadoBairro} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" className="form-control" id="cidade" value={current.cidade} onChange={this.estadoCidade} />
                            </div>
                            <div className="row">
                                <div className="col-md-3" style={{marginLeft: 18+'px', padding: 1+'px'}}>
                                    <label htmlFor="uf">UF</label>
                                    <input type="text" className="form-control" id="uf" value={current.uf} onChange={this.estadoUf} />
                                </div>

                                <div className="col-md-6" style={{marginLeft: 5.1+'em',padding:0}}>
                                    <label htmlFor="cep">CEP</label>
                                    <input type="text" className="form-control" id="cep" value={current.cep} onChange={this.estadoCep} />
                                </div>
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
                        </div>        
                    </form>
                </div>
                ) : (
                        <div>
                            <br />
                            <p>Selecione um(a) paciente...</p>
                        </div>
                    )}
                </div>
                )        
    }    
}    
