const db = require("../models")
const Paciente = db.pacientes
const Files = db.files


exports.cadastrar = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({ message: "O nome deve ser preenchido"})
        return
    }

    const paciente = new Paciente ({
        nome: req.body.nome,
        dtnascimento: req.body.dtnascimento,
        sexo: req.body.sexo,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
        rua: req.body.rua,
        num:req.body.num,
        complemento:req.body.complemento,
        bairro:req.body.bairro,
        cidade:req.body.cidade,
        uf:req.body.uf,
        cep:req.body.cep,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    paciente
        .save(paciente)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o paciente"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const nome = req.query.nome
    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}

    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Paciente.find(condition)
    } if (!nome) {
        var query = {}
    }
    
    Paciente.paginate(query,{page, limit: 5})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os pacientes"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Paciente.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o paciente com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o paciente com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Paciente.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o paciente com o id=${id}. `
                })
            } else res.send({ message: "Paciente alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o paciente com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Paciente.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar o paciente com o id " + id
                })
            } else {
                res.send({
                    message: "Paciente deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o paciente com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Paciente.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedcount} pacientes foram deletados com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos os pacientes"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Paciente.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os pacientes ativos"
            })
        })
}

exports.buscarImagem = (req, res) => {
    const id = req.params.id

    Files.findById(id)   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar a imagem"
            })
        })
}

exports.buscarImagens = (req, res) => {   

    Files.find()   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as imagens"
            })
        })
}



exports.cadastrarImagem = (req, res) => {
    const { originalname: original, filename: foto, size, location: url = "" } = req.file
    if (!foto) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new Files ({
       original,
       foto,
       size, 
       url
    })
    file    
        .save(file)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a imagem"
            })
        })
}
