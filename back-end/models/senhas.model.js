module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var senhaSchema = mongoose.Schema ({
        numero: Number,
        paciente: String,
        tipo: String,
        local: String,
        guiche: String,
        data_senha: Date,
        status: String,
        ordem: Number,
        sigla: String,
        situacao: Boolean
    },
        { timestamps: true }
    )

    senhaSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
    })    
    senhaSchema.plugin(mongoosePaginate)
    const Senha = mongoose.model("senha", senhaSchema)
    return Senha
}        