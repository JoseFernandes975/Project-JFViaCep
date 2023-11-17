import * as modalController from './modal-controller.js';

 export function init() {
   const linkContact = document.querySelector(".link-contact");

   linkContact.addEventListener('click', handleLinkContactClick);
 }

 function handleLinkContactClick(event){
    event.preventDefault();
    modalController.showModal();
 }