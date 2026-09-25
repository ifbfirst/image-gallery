// переменные

const gallery = document.getElementById('gallery');
const input = document.querySelector('input');
const reset = document.querySelector('.reset');
let url = "https://api.unsplash.com/search/photos?query=home&per_page=16&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";

// функция получения данных в галерее по умолчанию

window.onload = function() {
  getData(url);
};

// Функция поиска

input.addEventListener("change", () =>  {
    
url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=16&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
getData(url);
gallery.innerHTML = '';});




 


// функция получения данных по API

  async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    openImg(data);
  }

 
//функция открытия галереи в html

  function openImg(data){
    
    // ДОБАВЛЕНО ИСПРАВЛЕНИЕ: data.results.length вместо 16, чтобы код не падал, если картинок меньше 16
    for (let i=0; i < data.results.length; i++){
      gallery.innerHTML += `<img src="${data.results[i].urls.regular}">`;
    }

}

/*//Функция обнуления поиска

reset.addEventListener('click', function(event) {

  if (event.target = true) { 
    input.value = '';}
    });*/


// ============================================================
// НОВЫЙ КОД: УВЕЛИЧЕНИЕ ПРИ КЛИКЕ (МОДАЛЬНОЕ ОКНО)
// ============================================================

// 1. Создаем элементы модального окна прямо из JS, чтобы не править HTML
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000; opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `
  max-width: 90%; max-height: 85vh;
  width: auto; height: auto;
  object-fit: contain; border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
`;

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

// 2. Отслеживаем клик по картинкам в галерее
gallery.addEventListener('click', (event) => {
  // Проверяем, что кликнули именно по картинке <img>
  if (event.target.tagName === 'IMG') {
    lightboxImg.src = event.target.src; // Берем адрес картинки, на которую кликнули
    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
  }
});

// 3. Закрываем окно при клике на любое место темного фона
lightbox.addEventListener('click', () => {
  lightbox.style.opacity = '0';
  lightbox.style.pointerEvents = 'none';
  document.body.style.overflow = ''; // Возвращаем прокрутку страницы
});
