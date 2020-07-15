const db = require("../models")
const Clinica = db.clinica
const Files = db.files

exports.cadastrar = (req, res,) => {
    if (!req.body.razao) {
        res.status(400).send({ message: "A razão social deve ser preenchida"})
        return
    }

    const clinica = new Clinica ({
        razao: req.body.razao,
        fantasia: req.body.fantasia,
        cnpj: req.body.cnpj,
        inscricao: req.body.inscricao,
        telefone: req.body.telefone,
        email: req.body.email,
        rua: req.body.rua,
        num: req.body.num,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    clinica
        .save(clinica)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a clinica"
            })
        })

}

exports.buscar = (req, res) => {
    const id = req.params.id

    Clinica.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada nenhuma clínica ativa" })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a clínica ativa" })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Clinica.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a clínica com o id=${id}. `
                })
            } else res.send({ message: "Clínica alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a clínica com o id " + id
            })
        })
}

exports.buscarTodos = (req, res) => {
    const razao = req.query.razao
    var condition = razao ? { razao: { $regex: new RegExp(nome), $options: "i" } } : {}

    Clinica.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar a clínica"
        })
    })
}