const dbConfig = require ('../config/db.config')
const mongoose = require ('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.pacientes = require ('./pacientes.model')(mongoose)
db.files = require ('./files.model')(mongoose)
db.clinica = require ('./clinica.model')(mongoose)
db.salas = require ('./salas.model')(mongoose)
db.guiches = require ('./guiches.model')(mongoose)
db.senhas = require ('./senhas.model')(mongoose)
db.painel = require ('./painel.model')(mongoose)

module.exports = db

