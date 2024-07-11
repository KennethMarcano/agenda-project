const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });
        
        if(!this.user) {
            this.errors.push('Usuario ou senha invalidos.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha invalida.')
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        
        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);

    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(this.user) this.errors.push('Usuario já existe.');
    }

    valida() {
        this.cleanUp();
        // Validacao
        // O e-mail precisa ser valido
        if(!validator.isEmail(this.body.email)) 
            this.errors.push('E-mail invalido');

        // A senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50) 
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }

    // Funcion que formata la informacion mandada por el body
    cleanUp() {
        // Se verifica que la informacion sea de tipo string, si no se sobreescribe con un string vacio
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') this.body[key] = '';
        }

        // Aqui nos aseguramos que el body solo tenga el email e senha, porque originalmente tiene el csrf tojen
        this.body = {
            email: this.body.email,
            password: this.body.password
        };

    }

}

module.exports = Login;