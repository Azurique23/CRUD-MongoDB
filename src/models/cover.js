const {Schema, model} = require('mongoose');

const coverSchema = new Schema({
    tittle :{ 
        type: String, 
        required:true},

    description: String,
    user: {type:String, required: true}
}, {
    // Guarda as infos das data de criação e modificação.
    timestamps : true
}) ;


module.exports = model('cover', coverSchema)