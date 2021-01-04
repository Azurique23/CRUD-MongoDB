const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')


const userSechema = new Schema ({
    name: {type: String, required:true }, 
    email:{type: String, required: true},
    username: {type: String, required: true},
    password: {typer:  String, required:true}


},{
    timestamps : true
});

userSechema.method.encrypPassword = password =>{
    const salt = await enrypt.getSalt(10);
     return await encrypt.hash(password, salt);
}

userSechema.method.matchPassword = function(password){
    return await encrypt.compare(password, this.password);
}


module.exports = model('cover', userSechema);