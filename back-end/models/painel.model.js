module.exports = mongoose => {
    var painelSchema = mongoose.Schema ({
        descricao: String,
        cod: Number,
        situacao: Boolean
    },
        { timestamps: true }
    )

    painelSchema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject()
            object.id = _id
            return object
    })
    
   
    const Painel = mongoose.model("painel", painelSchema)
    return Painel
}        