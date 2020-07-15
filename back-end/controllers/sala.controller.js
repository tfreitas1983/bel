const db = require("../models")
const Sala = db.salas

exports.cadastrar = (req, res,) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "A descrição deve ser preenchida"})
        return
    }

    const sala = new Sala ({
        descricao: req.body.descricao,
        tipo: req.body.tipo,
        sigla: req.body.sigla,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    sala
        .save(sala)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a sala"
            })
        })

}

exports.buscar = (req, res) => {
    const id = req.params.id

    Sala.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada nenhuma sala ativa" })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a sala ativa" })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Sala.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a sala com o id=${id}. `
                })
            } else res.send({ message: "Sala alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a sala com o id " + id
            })
        })
}

exports.buscarTodos = (req, res) => {
    const descricao = req.query.descricao
    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    Sala.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar a sala"
        })
    })
}