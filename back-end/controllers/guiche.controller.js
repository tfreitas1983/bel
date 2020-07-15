const db = require("../models")
const Guiche = db.guiches

exports.cadastrar = (req, res,) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "A descrição deve ser preenchida"})
        return
    }

    const guiche = new Guiche ({
        descricao: req.body.descricao,
        sigla: req.body.sigla,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    guiche
        .save(guiche)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o guichê"
            })
        })

}

exports.buscar = (req, res) => {
    const id = req.params.id

    Guiche.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado nenhum guichê ativo" })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o guichê ativo" })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Guiche.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o guichê com o id=${id}. `
                })
            } else res.send({ message: "Guichê alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o guichê com o id " + id
            })
        })
}

exports.buscarTodos = (req, res) => {
    const descricao = req.query.descricao
    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    Guiche.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar o guichê"
        })
    })
}