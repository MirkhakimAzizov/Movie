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

movies.splice(20);


/* =============== New Arr =============== */
let nevMovies = [];
let arrCategory = [];
let bookmarkArr = [];


/* =============== Function =============== */
mainArrEditing(movies, nevMovies);
renderUi(nevMovies);
arrSelectFun(nevMovies, arrCategory);
selected(arrCategory.sort(), elSelectCategory);


/* =============== Main search btn =============== */
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