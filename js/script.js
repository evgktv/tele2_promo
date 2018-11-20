'use strict';


var overlay = document.querySelector('.overlay');

var formPopup = document.querySelector('.form');
var phoneForm = formPopup.querySelector("[name=telephone]");
var acceptForm = formPopup.querySelector("[name=accept]");

var offersPopup = document.querySelector('.offers');
var gifts = document.querySelectorAll('.gift');
var giftClose = document.querySelectorAll('.gift__close');

var formSubmit = document.querySelector('.form__submit');
var offersButtons = document.querySelectorAll('.offers__button');

var currentGift;

formSubmit.addEventListener('click', function(evt) {

    if (!phoneForm.value || !acceptForm.checked) {
        formPopup.classList.add('form__popup-error');
        setTimeout(function() {
            formPopup.classList.remove('form__popup-error');
        }, 700);
    }

    else {
      evt.preventDefault();

      overlay.classList.add("overlay-show");

    	formPopup.classList.add('form__popup-animation');

    	var timeoutForm = setTimeout(function() {
    		formPopup.classList.add('form--hidden');
       }, 1000);

      offersPopup.classList.remove('offers--hidden');
    	offersPopup.classList.add('offers__popup-animation');
    }
});

offersButtons.forEach(function (offersButtons, i) {

	offersButtons.addEventListener("click", function (evt) {
    evt.preventDefault();

    gifts[i].classList.remove('gift--hidden');
		gifts[i].classList.add('gift__popup-animation');
		currentGift = i;


		giftClose[currentGift].addEventListener("click", function (evt) {
      evt.preventDefault();

      gifts[currentGift].classList.remove('gift__popup-animation');
			gifts[currentGift].classList.add('gift__popup-animation-close');

	    var timeoutGift = setTimeout(function() {
		    gifts[currentGift].classList.add('gift--hidden');
		    gifts[currentGift].classList.remove('gift__popup-animation-close');
			}, 1000);
		})
	})
})