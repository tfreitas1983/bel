module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var schemaPacientes = mongoose.Schema ({
        nome: String,
        dtnascimento: { type: Date }, 
        sexo: String,
        cpf: Number,
        telefone: String,
        email: String,
        rua: String,
        num: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String,
        situacao: Boolean,
        foto: {
            type: String,
            default: 'default.jpg'
        }
    },
        { timestamps: true }
    )

    schemaPacientes.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaPacientes.plugin(mongoosePaginate)
    const Pacientes = mongoose.model("pacientes", schemaPacientes)    
    return Pacientes
}