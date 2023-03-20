"use strict";

let elList = document.querySelector(".hero__list");
let elForm = document.querySelector(".form");
let elSearchMain = document.querySelector(".header__search");
let elSearchTitle = document.querySelector(".hero__search_title");
let elSearchRating = document.querySelector(".hero__search_rating");
let elSelectCategory = document.querySelector(".hero__select_category");
let searchBtn = document.querySelector(".form__search");
let goBack = document.querySelector(".form__all");
let elBookmark = document.querySelector(".bookmark__list");
let elBookmarkBtn = document.querySelector(".btn__bookmark");
// let elSearch = document.querySelector(".hero__search");
// let elSelectTitle = document.querySelector(".hero__select_title");
// let elSearchCategory = document.querySelector(".hero__search_category");
// let elSelectLang = document.querySelector(".hero__select_lang");
// let elSelectYear = document.querySelector(".hero__select_year");

movies.splice(20);

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
// {/* <img src="${item.minImg}"  class="card-img-top" alt="${item.title}"> */}


function renderUi(arr) {
    arr.forEach(item => {

        let elItem = document.createElement("li");
        elItem.setAttribute("class", "card");
        let a = "     ";

        elItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Language: ${item.lang}</li>
                <li class="list-group-item mr-4"> Rating: ${item.rating}</li>
                <li class="list-group-item">${item.categories}</li>
                <li class="list-group-item">
                    <a href="${item.link}" class="card-link btn btn-danger">YouTube</a>
                    <a href="${item.link}" class="card-link btn btn-info btn__add" data-id="${item.id}">ADD
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </a>
                </li>
            </ul>
            

        `
            // srcset="${item.minImg} 1x, ${item.maxImg} 2x"
        elList.append(elItem);

    });
}

let arrCategory = [];
// let arrTitle = [];
// let arrYear = [];
// let arrLang = [];

// nevMovies.forEach(item => {
//     if (!arrTitle.includes(item.title)) {
//         arrTitle.push(item.title);
//     }
// });
// nevMovies.forEach(item => {
//     if (!arrYear.includes(item.year)) {
//         arrYear.push(item.year);
//     }
// });
// nevMovies.forEach(item => {
//     if (!arrLang.includes(item.lang)) {
//         arrLang.push(item.lang);
//     }
// });
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

// selected(arrTitle.sort(), elSelectTitle);
// selected(arrLang.sort(), elSelectLang);
// selected(arrYear.sort((a, b) => a - b), elSelectYear);
selected(arrCategory.sort(), elSelectCategory);

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
    console.log(value);

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



// elSelectTitle.addEventListener("change", (evt) => {
//     evt.preventDefault();
//     let value = evt.target.value;

//     let arrSelect = [];

//     function selecFun(arr) {
//         arr.forEach(item => {
//             if (value == item.title) {
//                 arrSelect.push(item);
//             }
//         })
//     }

//     if (value == "all") {
//         elList.innerHTML = '';
//         renderUi(nevMovies);
//     } else {
//         selecFun(nevMovies);
//         elList.innerHTML = '';
//         renderUi(arrSelect);
//     }

// })

searchBtn.addEventListener("click", (evt) => {

    evt.preventDefault();

    let newMovie = [];

    let valueTitle = elSearchTitle.value;
    let valueRating = elSearchRating.value;
    let valueCategory = elSelectCategory.value;

    newMovie = nevMovies.filter((item) => {

        return item.title.includes(valueTitle) && item.rating >= valueRating && item.categories.includes(valueCategory);

    });

    if (newMovie && newMovie.length) {
        elList.innerHTML = '';
        renderUi(newMovie);
    } else {
        elList.innerHTML = '';
        elList.innerHTML = `<h2 class="text-danger">NOT FOUND</h2>`;
    }

});

goBack.addEventListener("click", (evt) => {

    evt.preventDefault();

    elList.innerHTML = '';
    renderUi(nevMovies);

});

let bookmarkArr = [];

elList.addEventListener("click", (evt) => {

    evt.preventDefault();
    if (evt.target.matches(".btn__add")) {
        let id = evt.target.dataset.id;

        nevMovies.forEach((item) => {

            if (item.id == id) {
                if (!bookmarkArr.includes(item)) {
                    bookmarkArr.push(item);
                } else {
                    let i = bookmarkArr.indexOf(item);
                    bookmarkArr.splice(i, i + 1);
                }
            }

        });

    }
    // console.log(bookmarkArr);
    renderBookmark(bookmarkArr);

});

function minMax(that, value) {
    let min = parseInt(that.getAttribute("min"));
    let max = parseInt(that.getAttribute("max"));
    let val = parseInt(value);

    if (val < min || isNaN(val)) {
        return min;
    } else if (val > max) {
        return max;
    } else {
        return val;
    }

}

elBookmarkBtn.addEventListener("click", (evt) => {

    evt.preventDefault();

    elBookmark.classList.toggle("display");

});

function renderBookmark(arr) {
    arr.forEach(item => {

        let elItem = document.createElement("li");
        elItem.setAttribute("class", "card");
        let a = "     ";

        elItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Language: ${item.lang}</li>
                <li class="list-group-item mr-4"> Rating: ${item.rating}</li>
                <li class="list-group-item">${item.categories}</li>
                <li class="list-group-item">
                    <a href="${item.link}" class="card-link btn btn-danger">YouTube</a>
                    <a href="${item.link}" class="card-link btn btn-info btn__add" data-id="${item.id}">ADD
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </a>
                </li>
            </ul>
            

        `
            // srcset="${item.minImg} 1x, ${item.maxImg} 2x"
        elBookmark.append(elItem);

    });
}