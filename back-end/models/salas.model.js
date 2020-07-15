module.exports = mongoose => {
    var salaSchema = mongoose.Schema ({
        descricao: String,
        tipo: String,
        sigla: String,
        situacao: Boolean
    },
        { timestamps: true }
    )

    salaSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
    })
    

    const Sala = mongoose.model("sala", salaSchema)
    return Sala
}        