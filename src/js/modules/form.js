import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function form(fromSelector ,modalTimerId) {
  const forms = document.querySelectorAll(fromSelector);

  const message = {
      loading: 'img/form/spinner.svg',
      succsess: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
      bindPostData(item);
  });

  function bindPostData(form) {
      form.addEventListener('submit', (event) => {
          event.preventDefault();

          const statusMessage = document.createElement('img');
          statusMessage.classList.add('modal__loading');
          statusMessage.src = message.loading;

          form.insertAdjacentElement('afterend', statusMessage);

          const formData = new FormData(form);

          const json = JSON.stringify(Object.fromEntries((formData.entries())));

          postData('http://localhost:3000/requests', json)
              .then(data => {
                  console.log(data);
                  showThanksModal(message.succsess);
                  form.reset();
                  statusMessage.remove();
              })
              .catch(() => {
                  showThanksModal(message.failure);
              })
              .finally(() => {

              });
      });
  }

  function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;

      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal('.modal');
      }, 4000);
  }
}

export default form;