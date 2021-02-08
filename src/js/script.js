document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.matches('div.tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer 
    const daysBlock = document.querySelector('#days'),
        hoursBlock = document.querySelector('#hours'),
        minutesBlock = document.querySelector('#minutes'),
        secondsBlock = document.querySelector('#seconds'),
        endPromotion = new Date(2021, 4, 20, 0, 0, 0);

    function calculateTime() {
        const currentTime = new Date();
        const timeLeft = endPromotion - currentTime;
        let days = timeLeft/1000/60/60/24;
        let hours = (days - Math.floor(days)) * 24;
        let minuts = (hours - Math.floor(hours)) * 60;
        let seconds = (minuts - Math.floor(minuts)) * 60;
        showTime(days, hours, minuts, seconds);
    }
    function showTime(days, hours, minuts, seconds) {
        daysBlock.innerHTML = Math.floor(days);
        hoursBlock.innerHTML = Math.floor(hours);
        minutesBlock.innerHTML = Math.floor(minuts);
        secondsBlock.innerHTML = Math.floor(seconds);
    }

    setInterval(calculateTime, 1000);
});

