const Renderer = require("./renderer");

const CATEGORIES = require("../configuration/categories.json");
const COLORS = require("../configuration/colors.json");

const path = require("path");

class ProductBoxRenderer extends Renderer {
  applyID(template) {
    const { id } = this.options.design;
    return template.replace(/<%ID%>/, id);
  }

  applyIndex(template) {
    const { count } = this.options;
    return template.replace(/<%INDEX%>/, count);
  }

  applyName(template) {
    const { title } = this.options.design;
    return template.replace(/<%NAME%>/g, title);
  }

  applyBaseColor(template) {
    let color;
    const { design, productType } = this.options;
    const { baseColor, canRestrictColors, products } = design;

    if (canRestrictColors) {
      color = baseColor;
    } else {
      color = products[productType].colors[0];
    }

    return template.replace(/<%BASE_COLOR%>/g, color);
  }

  applyColors(template) {
    const { design, productType } = this.options;
    const product = design.products[productType];
    const toColor = color => `<li style="background-color: ${color}">&nbsp;</li>`;

    return template.replace(/<%COLORS%>/g, product.colors.map(toColor).join(""));
  }

  applyColorNames(template) {
    const { design, productType } = this.options;
    const product = design.products[productType];
    const toColorName = color => COLORS[color];

    return template.replace(/<%COLORS_TEXT%>/g, product.colors.map(toColorName).join(", "));
  }

  applyProductURL(template) {
    const { design, productType } = this.options;
    const { href } = design.products[productType];
    return template.replace(/<%PRODUCT_URL%>/g, href);
  }

  applyDescription(template) {
    const { description } = this.options.design;
    return template.replace(/<%DESCRIPTION%>/g, description);
  }

  applyImageURL(template) {
    const { imageFileName } = this.options;
    return template.replace(/<%IMAGE_URL%>/g, `/images/products/fc/${imageFileName}`);
  }

  applyProductPageURL(template) {
    const { productType, design } = this.options;
    const { id } = design;
    const { path } = CATEGORIES[productType];

    return template.replace(/<%PRODUCT_PAGE%>/g, `${path}/${id}`);
  }

  applyListURL(template) {
    const { listingFile } = this.options;

    if (!listingFile) {
      return template;
    }

    return template.replace(/<%LIST_URL%>/g, `https://geekscononda.com/${path.basename(listingFile, ".html")}`)
  }

  applyURL(template) {
    const { design, productType } = this.options;
    const { href } = design.products[productType];
    return template.replace(/<%URL%>/g, href);
  }

  applyPriceExpiration(template) {
    return template.replace(/<%PRICE_EXPIRATION%>/g, "2020-12-31");
  }

  applyPrice(template) {
    const { design, productType } = this.options;
    const { price } = design.products[productType];
    return template.replace(/<%PRICE%>/g, price);
  }

  applyProductType(template) {
    const { productType } = this.options;
    const { title } = CATEGORIES[productType];
    return template.replace(/<%PRODUCT_TYPE%>/g, title);
  }

  applyProductGroup(template) {
    const { productType } = this.options;
    const { group } = CATEGORIES[productType];
    return template.replace(/<%PRODUCT_GROUP%>/g, group);
  }

  applyIWantThis(template) {
    const { iWantThis } = this.options;
    return template.replace(/<%I_WANT_THIS%>/g, iWantThis)
  }
}

module.exports = ProductBoxRenderer;
