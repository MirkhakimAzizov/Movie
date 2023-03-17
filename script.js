"use strict";

let elList = document.querySelector(".hero__list");
let elSearchMain = document.querySelector(".header__search");
let elSearch = document.querySelector(".hero__search");
let elSelectTitle = document.querySelector(".hero__select_title");
let elSelectCategory = document.querySelector(".hero__select_category");
let elSelectLang = document.querySelector(".hero__select_lang");
let elSelectYear = document.querySelector(".hero__select_year");

movies.splice(100);

let nevMovies = [];

movies.forEach((item) => {
    let obj = {};

    obj.title = item.title;
    obj.year = item.year;
    obj.categories = item.categories;
    obj.id = item.imdbId;
    obj.lang = item.language;
    obj.time = `${Math.trunc(item.runtime/60)}h:${item.runtime%60}m`;
    obj.link = `https://youtu.be/${item.youtubeId}`;
    obj.info = item.summary;
    obj.minImg = item.smallThumbnail.trim();
    obj.maxImg = item.bigThumbnail;
    obj.rating = item.imdbRating;

    nevMovies.push(obj);
});

renderUi(nevMovies);

function renderUi(arr) {
    arr.forEach(item => {

        let elItem = document.createElement("li");
        elItem.setAttribute("class", "card");

        elItem.innerHTML = `
        
            <img src="${item.minImg}"  class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.info}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Language: ${item.lang}</li>
                <li class="list-group-item">Year: ${item.year}</li>
                <li class="list-group-item">${item.categories}</li>
                <li class="list-group-item">Rating: ${item.rating}</li>
                <li class="list-group-item">
                    <a href="${item.link}" class="card-link">YouTube</a>
                </li>
            </ul>
            

        `
            // srcset="${item.minImg} 1x, ${item.maxImg} 2x"
        elList.append(elItem);

    });
}

let arrTitle = [];
let arrYear = [];
let arrLang = [];
let arrCategory = [];

nevMovies.forEach(item => {
    if (!arrTitle.includes(item.title)) {
        arrTitle.push(item.title);
    }
});
nevMovies.forEach(item => {
    if (!arrYear.includes(item.year)) {
        arrYear.push(item.year);
    }
});
nevMovies.forEach(item => {
    if (!arrLang.includes(item.lang)) {
        arrLang.push(item.lang);
    }
});
nevMovies.forEach(item => {
    let arr = [];
    arr.push(item.categories);
    arr.forEach(el => {
        el.forEach(i => {
            if (!arrCategory.includes(i)) {
                arrCategory.push(i);
            }
        })
    });
});

selected(arrTitle, elSelectTitle);
selected(arrLang, elSelectLang);
selected(arrYear, elSelectYear);
selected(arrCategory, elSelectCategory);

function selected(arr, elm) {

    arr.forEach(item => {

        let elOption = document.createElement("option");
        elOption.textContent = item;
        elm.append(elOption);

    })

}

elSearchMain.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    let value = evt.target.value.toUpperCase();
    if (value != "" || value != " ") {
        let newArr = nevMovies.filter(item => {
            let val = item.title.toUpperCase();
            return val.includes(value);
        });
        elList.innerHTML = '';
        renderUi(newArr);
    } else {
        renderUi(nevMovies);
    }
});