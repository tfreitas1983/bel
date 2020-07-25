module.exports = app => {
    const pacientes = require('../controllers/paciente.controller')
    const clinica = require('../controllers/clinica.controller')
    const salas = require ('../controllers/sala.controller')
    const guiches = require ('../controllers/guiche.controller')
    const senhas = require ('../controllers/senha.controller')
    const painel = require ('../controllers/painel.controller')

    const Router  = require ('express')
    const multer = require ('multer')
    const multerConfig  = require ('../config/multer')
    
    var router =  new Router()
    const upload = multer(multerConfig)


    router.post("/pacientes", pacientes.cadastrar)
    router.get("/pacientes", pacientes.buscarTodos)    
    router.get("/pacientes/:id", pacientes.buscarUm)
    router.put("/pacientes/:id", pacientes.editar)
    router.delete("/pacientes/:id", pacientes.apagar)
    router.delete("/pacientes", pacientes.apagarTodos)

    router.get("/pacientes/files", pacientes.buscarImagens)
    router.get("/pacientes/files/:id", pacientes.buscarImagem)
    router.post("/pacientes/files", upload.single('file'), pacientes.cadastrarImagem)   
    
    router.get("/clinica", clinica.buscarTodos)    
    router.get("/clinica/:id", clinica.buscar)
    router.put("/clinica/:id", clinica.editar)
    router.post("/clinica", clinica.cadastrar)

    router.post("/salas", salas.cadastrar)
    router.get("/salas", salas.buscarTodos)
    router.get("/salas/:id", salas.buscar)
    router.put("/salas/:id", salas.editar)

    router.post("/guiches", guiches.cadastrar)
    router.get("/guiches", guiches.buscarTodos)
    router.get("/guiches/:id", guiches.buscar)
    router.put("/guiches/:id", guiches.editar)

    router.post("/senhas", senhas.cadastrar)
    router.get("/senhas", senhas.buscarTodos)
    router.get("/senhas/:id", senhas.buscarUm)
    router.put("/senhas/:id", senhas.editar)
    router.delete("/senhas/:id", senhas.apagar)
    router.delete("/senhas", senhas.apagarTodos)

    router.post("/painel", painel.cadastrar)
    router.get("/painel", painel.buscarTodos)
    router.get("/painel/:codigo", painel.buscar)
    router.put("/painel/:id", painel.editar)

    app.use('/api', router)

}