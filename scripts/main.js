var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var DETAIL_FRAME_SELECTOR = "[data-image-role='frame']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var IMAGE_URLS = ["img/otter1.jpg", "img/otter2.jpg", "img/otter3.jpg", "img/otter4.jpg", "img/otter5.jpg"];
var TITLES = ["Stayin' Alive", "How Deep Is Your Love", "You Should Be Dancing", "Night Fever", "To Love Somebody"];

function setDetails(imageUrl, titleText) {
    "use strict";
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

    detailImage.setAttribute("src", imageUrl);
    detailImage.setAttribute("data-image-url", imageUrl);
    detailImage.setAttribute("data-image-title", titleText);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    "use strict";
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    "use strict";
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    "use strict";
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    "use strict";
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    "use strict";
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);

    return thumbnailArray;
}

function hideDetails() {
 "use strict";
 document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
 "use strict";
 var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
 document.body.classList.remove(HIDDEN_DETAIL_CLASS);
 frame.classList.add(TINY_EFFECT_CLASS);
 setTimeout(function () {
  frame.classList.remove(TINY_EFFECT_CLASS);
}, 50);
}

function addKeyPressHandler() {
 "use strict";
 document.body.addEventListener('keyup', function (event) {
   event.preventDefault();
   console.log(event.keyCode);
   if (event.keyCode == ESC_KEY) { hideDetails(); }
 });
}


function previous() {
    var currentDisplay = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var currentImageUrl = imageFromThumb(currentDisplay);
    var currentOtter = 0;

    for (var i = 0; i < 5; i++) {
        if (IMAGE_URLS[i] == currentImageUrl) {
            currentOtter = i;
        }
    }

    if (currentOtter > 0) {
        setDetails(IMAGE_URLS[currentOtter - 1], TITLES[currentOtter - 1]);
        showDetails();
    }
}

function next() {
    var currentDisplay = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var currentImageUrl = imageFromThumb(currentDisplay);
    var currentOtter = 0;

    for (var i = 0; i < 5; i++) {
        if (IMAGE_URLS[i] == currentImageUrl) {
            currentOtter = i;
        }
    }

    if (currentOtter < 4) {
        setDetails(IMAGE_URLS[currentOtter + 1], TITLES[currentOtter + 1]);
        showDetails();
    }
}


function addButtonHandlers() {
    "use strict";
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");

    previousButton.addEventListener("click", function(event) {
        event.preventDefault();
        previous();
    });
    
    nextButton.addEventListener("click", function(event) {
        event.preventDefault();
        next();
    });
}


function initializeEvents() {
    "use strict";
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addButtonHandlers();
}

initializeEvents();