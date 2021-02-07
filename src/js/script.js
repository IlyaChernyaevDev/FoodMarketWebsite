document.addEventListener('DOMContentLoaded', () => {
    const styleFoodList = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent'),
        styleFoodItems = document.querySelectorAll('.tabheader__item');
    let displayBlockIndex,
        displayNoneIndex;
    for(let i = 1; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    styleFoodList.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target && event.target.matches('.tabheader__item')) {
            styleFoodItems.forEach((item, index) => {
                if(item.classList.contains('tabheader__item_active')) {
                    displayNoneIndex = index;
                    item.classList.remove('tabheader__item_active')
                }
            });
            // console.dir(event.target.outerText);
            event.target.classList.add('tabheader__item_active');
            styleFoodItems.forEach((item, index) => {
                if(item.textContent == event.target.outerText) displayBlockIndex = index;
            });
            tabContent.forEach((item, index) => {
                if(index === displayBlockIndex) {
                    item.style.display = 'block';
                } else if(index === displayNoneIndex) {
                    item.style.display = 'none';
                }
            });
        }
    });
});

