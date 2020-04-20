const banner = document.querySelector(".banner");

if (banner) {
  const slideNumber = Math.ceil(Math.random() * 3);
  banner.classList.add(`slide-${slideNumber}`);
}

const productColors = [...document.querySelectorAll(".product__colors li")];

if (productColors.length) {
  document.body.addEventListener("mouseover", (event) => {
    if (!productColors.includes(event.target)) {
      return;
    }

    /** @type {HTMLElement} */
    const colorNode = event.target;

    /** @type {HTMLElement} */
    const productColorElement = colorNode.parentElement.parentElement.querySelector(".product__image-container");
    productColorElement.style.backgroundColor = colorNode.style.backgroundColor;
    productColorElement.style.borderColor = colorNode.style.backgroundColor;
  });
}