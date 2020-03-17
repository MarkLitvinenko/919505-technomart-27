
var buyLinks = document.querySelectorAll(".buy-button");

var buyPopup = document.querySelector(".popup-added-to-cart-section");
var buyContinue = buyPopup.querySelector(".popup-added-to-cart-continue-button");
var buyClose = buyPopup.querySelector(".modal-close-button");

var chosenProducts = document.querySelector(".cart-button");
var chosenProductsQuantity = 0;

for (i = 0; i < buyLinks.length; i++) {
  buyLinks[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    buyPopup.classList.add("modal-show");

    chosenProductsQuantity++;
    chosenProducts.classList.add("header-menu-button-not-empty");
    chosenProducts.innerHTML = "Корзина: " + chosenProductsQuantity;
  });
}

buyContinue.addEventListener("click", function (evt) {
  closePopup(buyPopup, evt);
});

buyClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  buyPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (buyPopup.classList.contains("modal-show")) {
      closePopup(buyPopup, evt);
    }
  }
});

var bookmarks = document.querySelector(".bookmarks-button");
var addToBookmarksButtons = document.querySelectorAll(".add-to-bookmarks-button");

var bookmarksQuantity = 0;

for (i = 0; i < addToBookmarksButtons.length; i++) {
  addToBookmarksButtons[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    bookmarksQuantity++;
    bookmarks.classList.add("header-menu-button-not-empty");
    bookmarks.innerHTML = "Закладки: " + bookmarksQuantity;
  });
}

var mapLink = document.querySelector(".interactive-map-img");

var mapPopup = document.querySelector(".popup-map-section");
var mapClose = mapPopup.querySelector(".modal-close-button");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  closePopup(mapPopup, evt);
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapPopup.classList.contains("modal-show")) {
      closePopup(mapPopup, evt);
    }
  }
});

var link = document.querySelector(".write-us-button");
var popup = document.querySelector(".write-us-section");
var close = popup.querySelector(".modal-close-button");

var form = popup.querySelector("form");
var nameField = form.querySelector("[name=name]");
var email = form.querySelector("[name=email]");
var message = form.querySelector("[name=message]");

var isStorageSupport = true;
var nameStorage = "";
var emailStorage = "";

try {
  nameStorage = localStorage.getItem("name");
  emailStorage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (nameStorage) {
    nameField.value = nameStorage;
    email.focus();
  } else {
    nameField.focus();
  }

  if (emailStorage) {
    email.value = emailStorage;
    message.focus();
  } else {
    email.focus();
  }
});

close.addEventListener("click", function (evt) {
  closePopup(popup, evt);
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!nameField.value || !email.value || !message.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
    console.log("Нужно ввести имя, почтовый ящик и сообщение");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});

function closePopup (popup, evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
}
