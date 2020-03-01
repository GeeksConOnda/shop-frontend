var state = {
  category: 'todo'
};

var catalogs = document.querySelectorAll("section[data-category]");
var buyButtons = document.querySelectorAll("a.buy");

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
  } else if (newCategory.includes("tu-pedido")) {
    console.log(newCategory);
    catalogs.forEach(function (/** @type HTMLElement */ catalog) {
      catalog.style.display = 'none';
      catalog.querySelector("header").style.display = "none";
    });
    document.querySelector("[data-category='tu-pedido']").style.display = "block";
    var orderId = newCategory.split("/")[1];
    if (orderId) {
      document.querySelector("#order-id").value = orderId;
      document.querySelector("#get-order").click();
    }
  } else {
    catalogs.forEach(function (/** @type HTMLElement */ catalog) {
      catalog.style.display = catalog.dataset['category'] === newCategory ? 'block' : 'none';
      catalog.querySelector("header").style.display = "none";
    });
    gtag("event", "view_search_results", { search_term: newCategory });
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

function trackPurchaseIntention() {
  buyButtons.forEach(function (/** @type HTMLAnchorElement */ buyButton) {
    buyButton.addEventListener("click", function () {
      event.preventDefault();
      gtag("event", "begin_checkout");
      window.location = buyButton.href;
    });
  });
}

function getOrder(event) {
  event.preventDefault();

  var orderResults = document.querySelector("#order-data");
  orderResults.style.display = "block";
  var id = document.querySelector("#order-id").value;
  orderResults.innerHTML = "<h1>Buscando...</h1>";
  fetch("/api/orders?id=GCO" + id, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    if (!json.id) {
      orderResults.innerHTML = "<h1>No encontramos<br>este número de pedido.</h1><p>Si has realizado esta compra hoy mismo, intentá nuevamente en 24 horas.</p>";
      return;
    }

    var html = "<h1>Orden #" + json.id.substr(3) + "</h1>";
    html += "<h2>Fecha de compra</h2><label>" + json.date + "</label>";
    html += "<h2>Estado</h2><label>" + json.status + "</label>";
    html += "<h2>Código de seguimiento</h2><label>" + json.trackingCode + "</label>";
    orderResults.innerHTML = html;
  });
}

window.addEventListener("hashchange", showProducts);
document.querySelector("#order-form").addEventListener("submit", getOrder);

showProducts({ newURL: window.location.href });
trackPurchaseIntention();