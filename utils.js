"use strict";


/* =============== Render UI function =============== */
function renderUi(arr) {
    arr.forEach(item => {

        let elItem = document.createElement("li");
        elItem.setAttribute("class", "card");
        // <img src="${item.minImg}" srcset="${item.minImg} 1x, ${item.maxImg} 2x" class="card-img-top" alt="${item.title}">
        elItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex gap-4">
                        <span class="text-warning d-flex align-items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            Rating: ${item.rating}</span>
                        <span class="text-primary  text-decoration-underline">${item.time}</span> </div>
                    <div>Language: ${item.lang}</div>
                    <div>Year: ${item.year}</div>
                    <div></div>
                </li>
                <li class="list-group-item">
                    <a class="card-link btn btn-success w-100 mx-auto mb-2 btn__more" data-more="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">More</a>
                    <a href="${item.link}" class="card-link btn btn-danger w-100 mx-auto mb-2">YouTube</a>
                    <a class="card-link btn btn-info btn__add w-100 mx-auto" data-id="${item.id}">ADD
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </a>
                </li>
            </ul>
            

        `
        elList.append(elItem);

    });
}


/* =============== Render Bookmark function =============== */
function renderBookmark(arr) {
    arr.forEach(item => {

        let elItem = document.createElement("li");
        elItem.setAttribute("class", "card");

        elItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Language: ${item.lang}</li>
                <li class="list-group-item">${item.categories}</li>
                <li class="list-group-item">
                    <a class="card-link btn btn-success w-100 mx-auto mb-2" data-more="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">More</a>
                    <a href="${item.link}" class="card-link btn btn-danger w-100 mx-auto mb-2">YouTube</a>
                    <a class="card-link btn btn-warning btn__add w-100 mx-auto" data-id="${item.id}">REMOVE</a>
                </li>
            </ul>
            

        `
            // srcset="${item.minImg} 1x, ${item.maxImg} 2x"
        elBookmark.append(elItem);

    });
}


/* =============== Main Arr editing =============== */
function mainArrEditing(arr1, arr2) {
    let t;
    arr1.forEach((item) => {
        let obj = {};
        Math.trunc(item.runtime / 60) > 0 ? t = Math.trunc(item.runtime / 60) : t = item.runtime;

        obj.title = item.title;
        obj.year = item.year;
        obj.categories = item.categories;
        obj.id = item.imdbId;
        obj.lang = item.language;
        obj.time = `${t}h:${item.runtime%60}m`;
        obj.link = `https://youtu.be/${item.youtubeId}`;
        obj.info = item.summary;
        obj.minImg = item.smallThumbnail.trim();
        obj.maxImg = item.bigThumbnail;
        obj.rating = item.imdbRating;

        arr2.push(obj);
    });

}


/* =============== Arr editing category =============== */
function arrSelectFun(arr1, arr2) {

    arr1.forEach(item => {
        let arr = [];
        arr.push(item.categories);
        arr.forEach(el => {
            el.forEach(i => {
                if (!arr2.includes(i)) {
                    arr2.push(i);
                }
            })
        });
    });

}


/* =============== Selected function =============== */
function selected(arr, elm) {

    arr.forEach(item => {

        let elOption = document.createElement("option");
        elOption.textContent = item;
        elm.append(elOption);

    })

}


/* =============== MinMax function =============== */
function minMax(that, value) {
    let min = parseInt(that.getAttribute("min"));
    let max = parseInt(that.getAttribute("max"));
    let val = parseInt(value);

    if (val) {
        if (val < min || isNaN(val)) {
            return min;
        } else if (val > max) {
            return max;
        } else {
            return val;
        }
    }

}