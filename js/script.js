'use strict';

const sliderItems = document.querySelectorAll('.slider-item');
const sliderBtns = document.querySelectorAll('.slider-button');

const featureItems = document.querySelectorAll('.feature-item');
const featureBtns = document.querySelectorAll('.feature-button');

const writeUsModal = document.querySelector('.modal-write-us');
const writeUsBtn = document.querySelector('.write-us-button');

const mapModal = document.querySelector('.modal-map');
const mapBtn = document.querySelector('.map-button');

let modalCloseBtn;

const setListenerForItems = function (items, buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      for(let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('button-current');
        items[j].classList.remove('item-current');
      }
      buttons[i].classList.add('button-current');
      items[i].classList.add('item-current');
    });
  }
};

setListenerForItems(sliderItems, sliderBtns);
setListenerForItems(featureItems, featureBtns);

const setListenerForModal = function (modal, button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal-current');
    modalCloseBtn = modal.querySelector('.modal-close');
    modalCloseBtn.addEventListener('click', function(evt) {
      evt.preventDefault();
      modal.classList.remove('modal-current');
      modal.classList.remove('modal-error');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        modal.classList.remove('modal-current');
        modal.classList.remove('modal-error');
      }
    });

    if (modal.classList.contains('modal-write-us')) {
      setHandlerForForm(modal);
    } else {
      modalCloseBtn.focus();
    }
  });
};

const setHandlerForForm = function (modal) {

  const writeUsForm = modal.querySelector('.write-us-form');
  const nameInput = modal.querySelector('.write-us-name');
  const emailInput = modal.querySelector('.write-us-email');
  const textareaInput = modal.querySelector('.write-us-textarea');

  let isStorageSupport = true;
  let storageName;
  let storageEmail;

  try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName && storageEmail) {
    nameInput.value = storageName;
    emailInput.value = storageEmail;
    textareaInput.focus();
  } else {
    nameInput.focus();
  }

  writeUsForm.addEventListener('submit', function (evt) {
    if (!nameInput.value || !emailInput.value || !textareaInput.value) {
      evt.preventDefault();
      modal.classList.remove('modal-error');
      void modal.offsetWidth;
      modal.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('email', emailInput.value);
      }
    }
  });
};

setListenerForModal(writeUsModal, writeUsBtn);
setListenerForModal(mapModal, mapBtn);
