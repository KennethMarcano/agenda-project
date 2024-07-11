import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login'
import Cadastro from './modules/CadastroContato';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const cadastroContato = new Cadastro('.form-cria');
const editaContato = new Cadastro('.form-edita')

login.init();
cadastro.init();
cadastroContato.init();
editaContato.init();


//import './assets/css/style.css';
