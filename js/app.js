var state = {
  category: 'todo'
};

var catalogs = document.querySelectorAll("section[data-category]");

function showProducts(/** @type HashChangeEvent|string */ eventOrCategory) {
  var newCategory = eventOrCategory;

  if ('newURL' in eventOrCategory) {
    newCategory = eventOrCategory.newURL.split("#")[1] || "todo";
  }

  if (newCategory === "todo") {
    catalogs.forEach(function (/** @type HTMLElement */ catalog) {
      catalog.style.display = 'block';
      catalog.querySelector("header").style.display = "block";
    });
  } else {
    catalogs.forEach(function (/** @type HTMLElement */ catalog) {
      catalog.style.display = catalog.dataset['category'] === newCategory ? 'block' : 'none';
      catalog.querySelector("header").style.display = "none";
    });
  }

  state.category = newCategory;
}

function menu() {
  var menuItems = document.querySelectorAll("nav li a");
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      showProducts(menuItem.getAttribute('href').substr(1));
    });
  });
}

window.addEventListener("hashchange", showProducts);
showProducts({ newURL: window.location.href });