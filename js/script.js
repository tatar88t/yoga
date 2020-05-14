//задаем глобальный eventListener, который определяе начало выполнение скрипта,
// только после загрузки всего HTML не дожидаясь окончания загрузки 
// таблиц стилей, кртинок и прочего

window.addEventListener('DOMContentLoaded', function() {

    // используем стрикт для поддержание нового стандарта ES6
        'use strict';

    // вытягиваем элементы HTML страницы для последующей работы с ними
            //берем все кнопки для переключения табов:
        let tab = document.querySelectorAll('.info-header-tab'), 
    // берем менюшку со всеми кнопками для переключения табов
    // (контейнер в которм содержатся все кнопки)
            info = document.querySelector('.info-header'),
    // берем все непосредственно вкладки табов с их контентом
            tabContent = document.querySelectorAll('.info-tabcontent');

    // функицмя которая закрывает табы, добавляя класс hide и убирая класс show
        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');

            }
        }
    // при аргументе 1 в функиции закрывающей табы, при ее вызове
    // после загрузки страницы закроются все табы кроме нулевого по счету
        hideTabContent(1);

    // функция которая открывает табы
        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }
    // блок в котором содержаться кнопки переключения табов
    //ждет события клика
        info.addEventListener('click', function(event) {
    //переменной target присваивается тот элемент на котором произошло событие
            let target = event.target;
    //при условии что мы нажали на конкретный элемент(кнопку/ссылку) который при этом
    //содержит класс info-header-tab 
            if (target && target.classList.contains('info-header-tab')) {
    //перебираем все элементы количество которых равно длине псевдомассива tab
    //а именно количества кнопок переключения табов
                for (let i = 0; i < tab.length; i++) {
    //и когда элемент совпадает с тем на который мы нажали
    //функция сначала прячет все табы а потом показывает именно тот, 
    //над которым совершили действие(кликнули)                
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
    //ну и когда нужный элемент найдет выходим из цикла с попмощью break
                        break;
                    }
                }
            }
        });
    // * * * TIMER * * *

    let deadline = '2020-09-20';

    function getTimeRemaining(endtime) {
    // присваиваем пременной t значение времени между
    // конечной датой и текущей датой (new Date())
        let t = Date.parse(endtime) - Date.parse(new Date()),
    // является значением в милисекундах, и чтобы нам получить кличество секунд
    // мы делим t на 1000, и берем остаток от деления на 60        
            seconds = Math.floor((t/1000) % 60),
    // чтобы получить минуты делим на 1000 на 60 и берем остаток от деления на 60
            minutes = Math.floor(((t/1000)/60) % 60),
    // чтобы получить часы делим на тысячу получаем секунды умножаем на 60 - минуты еще раз на 60 - часы
            hours = Math.floor((t/(1000*60*60)));
    //записываем значения в обьект для дальнейшего использования этих значений
            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }   

        function setClock(id, endtime) {
    //выбираем родительский элемент по id
            let timer = document.getElementById(id),
    //вытаскиеваем из родительского элемента timer элементы hours minutes seconds соответственно
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
    // задаем выполнение функции updateclock переменной timeInterval каждую секунду 
                timeInterval = setInterval(updateClock, 1000);


            function updateClock(){
    //берем функцию getTimeRemaining , которая будет возвращать значения нужных 
    // нам переменных значений в часах, минутах и секундах
                let t = getTimeRemaining(endtime);

    // добавляем нули перед цифрой врмени если раряднось меньше 2
                function addZero(num){
                        if(num<10) {
                            return '0' + num;
                        } else {
                            return num;
                        }
                }
                        minutes.textContent = addZero(t.minutes);
                        seconds.textContent = addZero(t.seconds);
                        hours.textContent = addZero(t.hours);
    //если общее время меньше 0 то преращаем выполнение функции и устанавливаем нулевые значения параметров времени
                if (t.total <= 0 ) {
                    clearInterval(timeInterval);
                    hours.textContent = '00';
                    minutes.textContent = '00';q
                    seconds.textContent = '00';
                }

            }
        }
        setClock('timer', deadline);

    // * * * MODAL WINDOW * * *

    function modalW(){
        let wind = document.querySelector('.overlay');
        let btn =document.querySelector('.more');
        let close =document.querySelector('.popup-close');
        btn.addEventListener('click', function(){
        
            wind.style.display = 'block';
            this.classList.add('more-splash');
    //добавляем overflow hiden  чтобы страничка не прокручивалась во аремя открытого 
    //модального окна
            document.body.style.overflow = 'hidden';     
            close.addEventListener('click',function(){
                wind.style.display = 'none';
                btn.classList.remove('more-splash');
                document.body.style.overflow = 'scroll';  
            })
        
        });
    }
    modalW();
  
// * * * POST request sending *     *    *
    let message = {
        loading: 'loading',
        success: 'Thank you! We will call you back soon',
        failure: 'Smth goes wrong...'    
    };
  
      let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form'),
        statusMessage = document.createElement('div');
  
      statusMessage.classList.add('status');
  
      form.addEventListener('submit', sendForm);
      contactForm.addEventListener('submit', sendForm);
  
      function sendForm(event) {
        event.preventDefault();
        event.target.appendChild(statusMessage);
    
        let formData = new FormData(event.target);
        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);
    
        function postData(data) {
          return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        
            request.send(data);
        
            request.addEventListener('readystatechange', function () {
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState === 4 && request.status == 200) {
                resolve();
              } else {
                reject();
              }
            });
        
            let input = event.target.getElementsByTagName('input');
            for (let i = 0; i < input.length; i++) {
              input.value = '';
            }
          });
        }
    
        postData(json)
          .then(() => statusMessage.innerHTML = message.loading)
          .then(() => statusMessage.innerHTML = message.success)
          .catch(() => statusMessage.innerHTML = message.failure);
      }

//***END POST REQUEST SENDING */



//***SLIDER--------------------- */
    
    let slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        slideIndex = 1;

        showSlides(slideIndex);

    function showSlides(n){
        
        if (n > slides.length){slideIndex = 1};
        if (n < 1){slideIndex = slides.length};
        
        
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    };

    function plusSlides(n) {
        showSlides(slideIndex += n)
    };
    function currentSlide(n) {
        showSlides(slideIndex = n);
    };

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });
    dotWrap.addEventListener('click', function(event) {
        
        for(let i=0; i < dots.length + 1; i++) {

            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    
//***END SLIDER----------------- */
});

//***CALCULATOR------------------ */
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;
    
        persons.addEventListener('input', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('input', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == '' || restDays.value == '' ) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value =='') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        })
//***END CALCULATOR--------------- */

















//  Add DIV * * *



// class Options {
//     constructor(height, width, bg, fontSize, textAlign) {
//         this.height = height;
//         this.width = width;
//         this.bg = bg;
//         this.fontSize = fontSize;
//         this.textAlign = textAlign;
//     }

    


//     createDiv() {
//         let elem = document.createElement('div');
//         document.body.appendChild(elem);
//         let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
//         elem.style.cssText = param;
//     }
// }

// const item = new Options(300, 3000, "#c78030", 14, "center");
 
// item.createDiv();
