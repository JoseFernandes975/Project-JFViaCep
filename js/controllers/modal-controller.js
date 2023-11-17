function State(){
    this.btnClose;
    this.modal;
}

const state = new State();

export function init() {
    state.modal = document.querySelector("#modal-contact");
    state.btnClose = document.querySelector("#btn-modal");

    state.btnClose.addEventListener('click', handleCloseModalClick);
    state.modal.addEventListener('click', handleContainerModalClick);
}

function handleCloseModalClick(event){
    event.preventDefault();
    closeModal();
}

function closeModal(){
    state.modal.classList.remove("active");
}

export function showModal(){
   state.modal.classList.add("active");
}

//o this referencia onde voce fez o evento, ja o event target é do elemento visual que clicou
//entao se o event.target for igual ao this, quer dizer que vc clicou fora de outro elemento visual, e não clicou em um elemento visual que esta na frente do modal
function handleContainerModalClick(event){
    event.preventDefault();
    if(event.target === this){
        closeModal();
    }
}
