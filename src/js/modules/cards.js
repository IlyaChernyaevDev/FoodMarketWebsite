import {getResource} from '../services/services';

function cards() {
  const menuCardContainer = document.querySelector('div.menu__field div.container');

  class MenuCard {
      constructor(src, alt, title, descr, price, cardContainer, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.cardContainer = cardContainer;
          this.transfer = 27;
          this.classes = classes;
          this.changeToUAH();
      }

      changeToUAH() {
          this.price = this.price * this.transfer;
      }

      renderMenuCard() {
          let cardClasses = '';
          if (this.classes.length === 0) {
              cardClasses = 'menu__item';
          } else {
              this.classes.forEach(item => cardClasses += ` ${item}`);
          }
          const card = `<div class="${cardClasses.trim()}">
                                  <img src=${this.src} alt=${this.imgDescr}>
                                  <h3 class="menu__item-subtitle">${this.title}</h3>
                                  <div class="menu__item-descr">${this.descr}</div>
                                  <div class="menu__item-divider"></div>
                                  <div class="menu__item-price">
                                      <div class="menu__item-cost">Цена:</div>
                                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                  </div>
                              </div>`;
          this.cardContainer.insertAdjacentHTML('beforeend', card);
      }
  }

  getResource('http://localhost:3000/menu')
      .then(data => {
          data.forEach(({
              img,
              altimg,
              title,
              descr,
              price
          }) => {
              new MenuCard(img, altimg, title, descr, price, menuCardContainer).renderMenuCard();
          });
      });
}

export default cards;