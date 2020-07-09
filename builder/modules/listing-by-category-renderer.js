const CATEGORIES = require("../configuration/categories.json");

const ProductBoxRenderer = require("./product-box-renderer");
const ImageDownloader = require("./image-downloader");
const OGImageGenerator = require("./og-image-generator");
const Renderer = require("./renderer");

const fs = require("fs");
const path = require("path");

const withProductType = (productType) => design => Object.keys(design.products).filter(product => product.startsWith(productType));

class ListingByCategoryRenderer extends Renderer {
  applyProductGroups(template) {
    const { designs, page, productBoxTemplate } = this.options;
    const productGroups = [];
    let position = 0;

    page.types.forEach(productType => {
      this.log("working on product type: %s", productType);
      const productGroupTitle = CATEGORIES[productType].title;
      const productGroupDescription = CATEGORIES[productType].description;

      const productGroupElements = [
        `<h2 class="product__type">${productGroupTitle}</h2>`,
        `<div class="product-type__description">${productGroupDescription}</div>`,
        `<section class="product-group">`,
      ];

      designs.filter(withProductType(productType)).forEach(design => {
        this.log("working on design: %s", design.id);

        if (!design.products[productType]) {
          return;
        }

        const { products, id } = design;
        const { images } = products[productType];
        const [firstImage] = images;
        const imageUrl = firstImage.split("/").pop();
        const imageFileName = path.basename(imageUrl);

        new ImageDownloader({ url: firstImage, imageFileName }).execute().then((writtenImageFile) => {
          const { baseColor, canRestrictColors, products } = design;
          let color;

          if (canRestrictColors) {
            color = baseColor;
          } else {
            color = products[productType].colors[0];
          }
          new OGImageGenerator({ image: writtenImageFile, color }).execute();
        });

        productGroupElements.push(new ProductBoxRenderer({
          design, productType, imageFileName,
          count: position, listingFile: page.file, iWantThis: page.iWantThis,
          template: productBoxTemplate
        }).execute());

        position += 1;
      });

      productGroupElements.push(`</section>`);

      productGroups.push(...productGroupElements);
    });

    return template.replace("<%CONTENT%>", productGroups.join(""));
  }

  applyActive(template) {
    const { path } = this.options.page;
    const { menuBoxTemplate } = this.options;

    return template.replace(/<%MENU%>/g, menuBoxTemplate).replace(`<a href="${path}`, `<a class="active" href="${path}`);
  }

  applyProductType(template) {
    const { category } = this.options.page;
    return template.replace(/<%PRODUCT_TYPE%>/g, category);
  }

  execute() {
    const { pages } = this.options;

    pages.filter(page => page.types).forEach(page => {
      this.options.page = page;

      super.execute();

      fs.writeFileSync(path.resolve(__dirname, `../../listings/${page.file}`), this.template);
    });
  }
}

module.exports = ListingByCategoryRenderer;
