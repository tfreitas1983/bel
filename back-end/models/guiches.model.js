module.exports = mongoose => {
    var guicheSchema = mongoose.Schema ({
        descricao: String,
        sigla: String,
        situacao: Boolean
    },
        { timestamps: true }
    )

    guicheSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
    })    

    const Guiche = mongoose.model("guiche", guicheSchema)
    return Guiche
}        