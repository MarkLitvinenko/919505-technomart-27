var isIndex = document.body.classList.contains("js-index");

var buyLinks = document.querySelectorAll(".buy-button");

var buyPopup = document.querySelector(".popup-added-to-cart-section");
var buyContinue = buyPopup.querySelector(".popup-added-to-cart-continue-button");
var buyClose = buyPopup.querySelector(".modal-close-button");

var chosenProducts = document.querySelector(".cart-button");
var chosenProductsQuantity = 0;

function closePopup (popup, evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
}

function putProductToCart () {
  chosenProducts.classList.add("header-menu-button-not-empty");
  chosenProducts.innerHTML = "Корзина: " + chosenProductsQuantity;
}

if(!isIndex) {
  chosenProductsQuantity = 10;
  putProductToCart();
}

for (i = 0; i < buyLinks.length; i++) {
  buyLinks[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    buyPopup.classList.add("modal-show");

    chosenProductsQuantity++;
    putProductToCart();
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
if(mapLink) {
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
}

var feedbacklink = document.querySelector(".write-us-button");
if (feedbacklink) {
  var feedbackPopup = document.querySelector(".write-us-section");
  var feedbackClose = feedbackPopup.querySelector(".modal-close-button");

  var form = feedbackPopup.querySelector("form");
  var fields = form.querySelectorAll(".write-us-form-input");
  var nameField = form.querySelector("[name=name]");
  var emailField = form.querySelector("[name=email]");
  var messageField = form.querySelector("[name=message]");

  var isStorageSupport = true;
  var nameStorage = "";
  var emailStorage = "";

  try {
    nameStorage = localStorage.getItem("name");
    emailStorage = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }

  feedbacklink.addEventListener("click", function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.add("modal-show");

    if (nameStorage) {
      nameField.value = nameStorage;
    }

    if (emailStorage) {
      emailField.value = emailStorage;
    }

    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        fields[i].focus();
        break;
      }
    }
    if (i === fields.length) {
      fields[i - 1].focus();
    }
  });

  feedbackClose.addEventListener("click", function (evt) {
    closePopup(feedbackPopup, evt);
    feedbackPopup.classList.remove("modal-error");
  });

  form.addEventListener("submit", function (evt) {
    if (!nameField.value || !emailField.value || !messageField.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-error");
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add("modal-error");
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
      if (feedbackPopup.classList.contains("modal-show")) {
        feedbackPopup.classList.remove("modal-show");
        feedbackPopup.classList.remove("modal-error");
      }
    }
  });
}
