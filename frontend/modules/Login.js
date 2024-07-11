import validator from 'validator'

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        const errorEmail = el.querySelector('.div-email').querySelector('.msj-error')
        const errorPassword = el.querySelector('.div-password').querySelector('.msj-error')
        errorPassword.classList.remove("alert", "alert-danger");
        errorEmail.classList.remove("alert", "alert-danger");
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            errorEmail.classList.add("alert", "alert-danger");
            errorEmail.textContent = 'Email invalido'
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            errorPassword.classList.add("alert", "alert-danger");
            errorPassword.textContent = 'A senha precisa ter entre 3 e 50 caracteres.'
            error = true;
        }

        if(!error) el.submit();

    }
}