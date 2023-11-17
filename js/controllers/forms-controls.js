import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import RequestException from '../services/exceptions/request-exception.js';
import * as listController from './list-controller.js';

//construtor state para guardas informações
function State() {
        this.address = new Address();
        this.inputCep = null;
        this.inputStreet = null;
        this.inputNumber = null;
        this.inputCity = null;
        this.btnSave = null;
        this.btnClear = null;
        this.errorCep = null;
        this.errorNumber = null;
    }

//instancia o objeto state
const state = new State();

export function init(){
    
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
    
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    //adicionando eventos nos elementos html
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);

   
}

//funções e tratamento dos eventos, o que vai acontecer caso o evento disparado

function handleInputNumberKeyup(event){
   state.address.number = event.target.value;
}

async function handleInputCepChange(event){
  try {
    const result = await addressService.findByCep(event.target.value);
    state.inputCity.value = result.city;
    state.inputStreet.value = result.street;
    state.address = result;

    setErrorForm("cep", "")
    state.inputNumber.focus();
  }
  catch (e) {
       setErrorForm("cep", "Informe um CEP válido!");
  }  
}

async function handleBtnSaveClick(event) {
  event.preventDefault();
  
  //Cria um objeto de erro, e pega se tiver
  const errors = addressService.getErrors(state.address);

  //transforma esse objeto em um array com as chaves/nome dos erros
  const keys = Object.keys(errors);

//se a array for maior que zero quer dizer que ela pegou um nome de erro, entao tem erro
//se tiver erro percorre o array, chama a funcao de erro, e passa o nome do elemento, e o valor dele no objeto errors como argumentos na funcao de erro
//se nao tiver nada, entao salva e limpa o formulario
  if(keys.length > 0) {
  
   keys.forEach(x => {
    setErrorForm(x, errors[x])
  });

   }

  else {
    listController.addCard(state.address);
    clearForm();
  }
  
}

 function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setErrorForm("number", "Campo Requerido");
  }
  else {
    setErrorForm("number", "");
  }
}

function handleBtnClearClick(event){
   event.preventDefault();
   clearForm();
}

function setErrorForm(key, value) {
    const element = document.querySelector(`[data-error=${key}]`);
    element.innerHTML= value;
}

function clearForm(){
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";
    state.errorCep.value = "";
    state.errorNumber.value = "";

    state.address = new Address();

    state.inputCep.focus();
}