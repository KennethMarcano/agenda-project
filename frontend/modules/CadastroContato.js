import validator from 'validator'

export default class Cadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.errors = [];
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        const emailInput = el.querySelector('input[name="email"]')
        const errorNome = el.querySelector('.div-nome').querySelector('.msj-error')
        const errorEmail = el.querySelector('.div-email').querySelector('.msj-error')
        const errorTelefone = el.querySelector('.div-telefone').querySelector('.msj-error')
        errorNome.textContent = '';
        errorEmail.textContent = '';
        errorTelefone.textContent = '';
        let error = false;

        if(emailInput.value && !validator.isEmail(emailInput.value)){
            errorEmail.textContent = 'Email invalido'
            error = true;
        }

        if(!nomeInput.value) {
            errorNome.textContent = 'Nome é um campo obrigatorio.'
            error = true;
        }

        if(!emailInput.value && !telefoneInput.value ){
            errorEmail.textContent = 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.'
            errorTelefone.textContent = 'Pelo menos um contato precisa ser enviado: e-mail ou telefone.'
            error = true;
        }

        if(!error) el.submit();

    }


}
