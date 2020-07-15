const express = require ('express')
const path = require ('path')
const fs = require("fs")
const bodyParser = require ('body-parser')
const cors = require ('cors')

const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado à base de dados")
    })
    .catch(err => {
        console.log("Erro ao conectar à base de dados")
        process.exit()
    })


    app.use("/files", express.static(path.resolve(__dirname, '..', 'front-end', 'src', 'images')))

    app.get("/", (req, res) => {
    res.json({ message: "Hello World"})
})



require("./routes/paciente.routes")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})
