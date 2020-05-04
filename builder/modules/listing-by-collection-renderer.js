const CATEGORIES = require("../configuration/categories.json");

const CollectionItemRenderer = require("./collection-item-renderer");
const DonationBoxRenderer = require("./donation-box-renderer");

const Renderer = require("./renderer");

const fs = require("fs");
const path = require("path");

class ListingByCollectionRenderer extends Renderer {
  applyCollection(template) {
    const { design, collectionItemBoxTemplate } = this.options;
    let position = 0;

    this.log("working on design: %s", design.id);

    const productGroupElements = [
      `<section class="product-group">`,
    ];

    Object.keys(design.products).filter(productType => CATEGORIES[productType].path).forEach(productType => {
      const product = design.products[productType];

      const { products, id } = design;
      const { images } = products[productType];
      const [firstImage] = images;
      const imageUrl = firstImage.split("/").pop();
      const imageFileName = path.basename(imageUrl);

      productGroupElements.push(new CollectionItemRenderer({
        design, productType, imageFileName, count: position,
        template: collectionItemBoxTemplate
      }).execute());

      position += 1;
    });

    productGroupElements.push(`</section>`);

    return template.replace("<%CONTENT%>", productGroupElements.join(""));
  };

  applyDonationBox(template) {
    const { donationBoxTemplate, design } = this.options;

    const donationBox = new DonationBoxRenderer({
      design, template: donationBoxTemplate
    }).execute();

    return template.replace(/<%DONATION_BOX%>/g, donationBox);
  }

  applyCollectionName(template) {
    const { title } = this.options.design;
    return template.replace(/<%COLLECTION_NAME%>/g, `${title}`);
  }

  applyCollectionDescription(template) {
    const { description } = this.options.design;
    return template.replace(/<%COLLECTION_DESCRIPTION%>/g, `${description}`);
  }

  applyActive(template) {
    const { menuBoxTemplate } = this.options;

    return template.replace(/<%MENU%>/g, menuBoxTemplate).replace(`<a href="/colecciones`, `<a class="active" href="/colecciones`);
  }

  applyProductTypes(template) {
    const { design } = this.options;
    const productTypes = [...new Set(Object.keys(design.products).map(productType => (CATEGORIES[productType].group || CATEGORIES[productType].title).toLowerCase()))].join(", ");
    return template.replace(/<%PRODUCT_TYPES%>/g, `${productTypes}`);
  }

  applyProductDescription(template) {
    const { description } = this.options.design;
    return template.replace(/<%PRODUCT_DESCRIPTION%>/g, `${description}`);
  }

  execute() {
    this.options.designs.forEach(design => {
      this.options.design = design;

      super.execute();

      fs.writeFileSync(path.resolve(__dirname, `../../listings/collections/${design.id}.html`), this.template);
    });
  }
}

module.exports = ListingByCollectionRenderer;
