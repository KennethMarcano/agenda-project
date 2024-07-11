const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true }, // Obrigatorio o nome do contato
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: ''  },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now } // Date now agarra la fecha del momento en que se llama
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
};

Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
    this.cleanUp()
    // Validacao
    // O e-mail precisa ser valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatorio.');
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
    };
};

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        telefone: this.body.telefone,
        email: this.body.email
    };
};

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

//Metodos estaticos
Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find()
        .sort({criadoEm: -1});
    return contatos;
};

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    await ContatoModel.findByIdAndDelete(id);
    return;
}

module.exports = Contato;