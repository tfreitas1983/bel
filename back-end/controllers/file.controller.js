const db = require("../models")
const Files = db.files

exports.cadastrar = (req, res) => {
    const { originalname: original, filename: foto, size, location: url = "" } = req.file
    if (!foto) {
        res.status(400).send({ message: "O arquivo deve ser enviada"})
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
                message: err.message || "Um erro ocorreu ao criar o arquivo"
            })
        })
}

exports.buscar = (req, res) => {
    const filename = req.body.foto
   
    Files.find(filename)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o arquivo com o nome "+ filename })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o arquivo com o nome " +filename })
        })
}