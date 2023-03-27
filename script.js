"use strict";


/* =============== Document elements =============== */
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
let elModalBody = document.querySelector(".modal-body");
let ElRightTop = document.querySelector(".hero__right__pagenation");



movies.splice(102);


/* =============== New Arr =============== */
let nevMovies = [];
let arrCategory = [];
let bookmarkArr = [];


/* =============== Function =============== */
mainArrEditing(movies, nevMovies);
// renderUi(nevMovies);
arrSelectFun(nevMovies, arrCategory);
selected(arrCategory.sort(), elSelectCategory);
pagenation(nevMovies);


/* =============== Pagenation =============== */
let elPagenation = document.querySelector(".pagenation");
let elCaruselInner = document.querySelector(".pagenation__box__inner");
let elBtn = document.querySelectorAll(".pagenation__btn-n");
let p = 0;

renderPagenation(nevMovies);


/* =============== Main search btn =============== */
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


/* =============== Search btn =============== */
searchBtn.addEventListener("click", (evt) => {

    evt.preventDefault();

    let newMovie = [];

    let valueTitle = elSearchTitle.value;
    let valueRating = elSearchRating.value;
    let valueCategory = elSelectCategory.value;

    newMovie = nevMovies.filter((item) => {

        return item.title.includes(valueTitle) || item.rating >= valueRating || item.categories.includes(valueCategory);

    });

    if (newMovie && newMovie.length) {
        elList.innerHTML = '';
        renderUi(newMovie);
    } else {
        elList.innerHTML = '';
        elList.innerHTML = `<h2 class="text-danger">NOT FOUND</h2>`;
    }

});


/* =============== Main UI btn =============== */
goBack.addEventListener("click", (evt) => {

    evt.preventDefault();

    elList.innerHTML = '';
    renderUi(nevMovies);

});


/* =============== Bookmark add btn =============== */
elList.addEventListener("click", (evt) => {

    evt.preventDefault();
    if (evt.target.matches(".btn__add")) {
        let id = evt.target.dataset.id;

        nevMovies.forEach((item) => {

            if (item.id == id) {
                if (!bookmarkArr.includes(item)) {
                    bookmarkArr.push(item);
                }
            }

        });

    }
    elBookmark.innerHTML = 'Bookmark:';
    renderBookmark(bookmarkArr);

});


/* =============== Bookmark remote btn =============== */
elBookmark.addEventListener("click", (evt) => {

    evt.preventDefault();
    if (evt.target.matches(".btn__add")) {
        let id = evt.target.dataset.id;

        nevMovies.forEach((item) => {

            if (item.id == id) {

                let i = bookmarkArr.indexOf(item);
                bookmarkArr.splice(i, i + 1);

            }

        });

    }
    elBookmark.innerHTML = `Bookmark:`;
    renderBookmark(bookmarkArr);

});


/* =============== Dropdown bookmark btn =============== */
elBookmarkBtn.addEventListener("click", (evt) => {

    evt.preventDefault();

    elBookmark.classList.toggle("display");

});


/* =============== Modal btn =============== */
elList.addEventListener("click", (evt) => {

    evt.preventDefault();

    elModalBody.innerHTML = "";

    if (evt.target.matches(".btn__more")) {
        let id = evt.target.dataset.more;

        nevMovies.forEach(item => {

            if (item.id === id) {

                elModalBody.innerHTML = `
                
                <img src="${item.minImg}" class="card-img-top mt-5 d-blok" alt="${item.title}">
                <div class="card-body w-100">
                <h5 class="card-title my-2">${item.title}</h5>
                <div class="d-flex gap-3">
                    <span class="text-warning d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        Rating: ${item.rating}</span>
                    <span class="text-primary  text-decoration-underline">${item.time}</span>
                </div>
                <p class="card-text"><strong>Category: </strong>${item.categories}</p>
                <p class="card-text"><strong>Summary: </strong>${item.info}</p>
                <a href="${item.link}" class="card-link btn btn-danger w-100 mx-auto mb-2">YouTube</a>

                `

            }

        });

    }

});


elBookmark.addEventListener("click", (evt) => {

    evt.preventDefault();

    elModalBody.innerHTML = "";

    if (evt.target.matches(".btn__more")) {
        let id = evt.target.dataset.more;
        nevMovies.forEach(item => {

            if (item.id === id) {

                elModalBody.innerHTML = `
                
                <img src="${item.minImg}" class="card-img-top mt-5 d-blok" alt="${item.title}">
                <div class="card-body w-100">
                <h5 class="card-title my-2">${item.title}</h5>
                <div class="d-flex gap-3">
                    <span class="text-warning d-flex align-items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        Rating: ${item.rating}</span>
                    <span class="text-primary  text-decoration-underline">${item.time}</span>
                </div>
                <p class="card-text"><strong>Category: </strong>${item.categories}</p>
                <p class="card-text"><strong>Summary: </strong>${item.info}</p>
                <a href="${item.link}" class="card-link btn btn-danger w-100 mx-auto mb-2">YouTube</a>

                `

            }

        });

    }

});


/* =============== Pagenation btn =============== */
elPagenation.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (evt.target.textContent === ">>") {
        p++;

        if (p > elBtn.length - 3) {
            p = elBtn.length - 3;
        }

        elCaruselInner.style.transform = `translateX(${-p*56}px)`;

    }
    if (evt.target.textContent === "<<") {
        p--;

        if (p < 0) {
            p = 0;
        }

        elCaruselInner.style.transform = `translateX(${-p*56}px)`;

    }

});