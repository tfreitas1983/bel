const db = require("../models")
const Painel = db.painel

exports.cadastrar = (req, res,) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "A descrição deve ser preenchida"})
        return
    }

    const painel = new Painel ({
        descricao: req.body.descricao,
        cod: req.body.cod,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    painel
        .save(painel)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o painel"
            })
        })

}

exports.buscar = (req, res) => {
    const Cod = req.params.codigo


    Painel.findOne({'cod':Cod})
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado nenhum painel ativo" })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o painel ativo" })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Painel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o painel com o id=${id}. `
                })
            } else res.send({ message: "Painel alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o painel com o id " + id
            })
        })
}

exports.buscarTodos = (req, res) => {
    const descricao = req.query.descricao
    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    Painel.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar o painel"
        })
    })
}