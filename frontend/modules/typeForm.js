export default class selectForm {
    constructor(formClass){
        this.button = document.getElementById(formClass);
    }

    init(){
        this.events();
    }

    events(){
        this.button.addEventListener('click', () => {
            if(this.button.textContent === 'Criar conta'){
                this.button.textContent = 'Entrar';
                document.getElementById('div-cadastro').classList.remove('d-none');
                document.getElementById('div-login').classList.add('d-none');
                document.getElementById('title').textContent = 'Criar sua conta';
                return;
            }
            this.button.textContent = 'Criar conta';
            document.getElementById('title').textContent = 'Entrar';
            document.getElementById('div-cadastro').classList.add('d-none');
            document.getElementById('div-login').classList.remove('d-none');

        })
    }
}