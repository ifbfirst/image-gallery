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
    
    for (let i=0;i<16;i++){
gallery.innerHTML += `<img src="${data.results[i].urls.regular}">`;

}

}

/*//Функция обнуления поиска

reset.addEventListener('click', function(event) {

  if (event.target = true) { 
    input.value = '';}
    });*/


