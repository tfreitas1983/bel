const db = require("../models")
const Senha = db.senhas

exports.cadastrar = (req, res) => {
    if (!req.body.numero) {
        res.status(400).send({ message: "A senha deve ser preenchida"})
        return
    }

    const senha = new Senha ({       
        numero: req.body.numero,
        paciente: req.body.paciente,
        tipo: req.body.tipo,
        data_senha: req.body.data_senha,
        local: req.body.local,
        status: req.body.status,
        ordem: req.body.ordem,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    senha
        .save(senha)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a senha"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const numero = req.query.numero
    var condition = numero ? { numero: { $regex: new RegExp(numero), $options: "i" } } : {}


    //Verifica se foi passado o nome na busca
    if (numero) {
        var query = Senha.find(condition)
    } if (!numero) {
        var query = {}
    }
    
    Senha.paginate(query,{page, limit: 5000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Um erro ocorreu ao buscar as senhas"
        })
    })
}

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Senha.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a senha com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a senha com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Senha.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a senha com o id=${id}. `
                })
            } else res.send({ message: "Senha alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a senha com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Senha.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar a senha com o id " + id
                })
            } else {
                res.send({
                    message: "Senha deletada com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar a senha com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Senha.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} senhas foram deletadas com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos as senhas"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Senha.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as senhas ativas"
            })
        })
}