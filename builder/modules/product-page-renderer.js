const CATEGORIES = require("../configuration/categories.json");

const Renderer = require("./renderer");
const ProductBoxRenderer = require("./product-box-renderer");
const DonationBoxRenderer = require("./donation-box-renderer");

const fs = require("fs");
const path = require("path");

class ProductPageRenderer extends Renderer {
  applyProductListingURL(template) {
    const { productType, design } = this.options;
    const { id } = design;
    const { path } = CATEGORIES[productType];

    return template.replace(/<%PRODUCT_LISTING_URL%>/g, `https://geekscononda.com${path}/${id}`);
  }

  applyProductTypeInfo(template) {
    const { productInfoTemplate } = this.options;
    return template.replace(/<%PRODUCT_TYPE_INFO%>/g, `${productInfoTemplate}`)
  }

  applyActive(template) {
    const { menuBoxTemplate } = this.options;
    const category = CATEGORIES[this.options.productType];
    const path = category.path.split("/").slice(0, 2).join("/");
    return template.replace(/<%MENU%>/g, menuBoxTemplate).replace(`<a href="${path}`, `<a class="active" href="${path}`);
  }

  applySingleProductType(template) {
    const { productType } = this.options;
    const { single } = CATEGORIES[productType];
    return template.replace(/<%PRODUCT_TYPE_SINGLE%>/g, single);
  }

  applyDonationBox(template) {
    const { donationBoxTemplate, design } = this.options;

    const donationBox = new DonationBoxRenderer({
      design, template: donationBoxTemplate
    }).execute();

    return template.replace(/<%DONATION_BOX%>/g, donationBox);
  }

  applyCollectionURL(template) {
    const { id } = this.options.design;
    return template.replace(/<%COLLECTION_URL%>/g, `/coleccion/${id}`);
  }

  applyProductGroup(template) {
    const { productType } = this.options;
    const { group } = CATEGORIES[productType];
    return template.replace(/<%PRODUCT_GROUP%>/g, group);
  }

  applyProductGoogleCategory(template) {
    const { productType } = this.options;
    const { googleCategoryId } = CATEGORIES[productType];
    return template.replace(/<%PRODUCT_GOOGLE_CATEGORY%>/g, googleCategoryId);
  }

  execute() {
    const { designs, templates } = this.options;

    designs.forEach(design => {
      this.options.design = design;
      Object.keys(design.products).filter(productType => CATEGORIES[productType].path).forEach(productType => {
        this.log("working on product page for %s:%s", productType, design.id);
        this.options.productType = productType;
        this.options.productInfoTemplate = templates[`products/${productType}`];

        const [firstImage] = design.products[productType].images;
        const imageUrl = firstImage.split("/").pop();
        const imageFileName = path.basename(imageUrl);

        super.execute();

        this.template = new ProductBoxRenderer({
          design, productType, imageFileName,
          template: this.template
        }).execute();

        const productTypePath = path.resolve(__dirname, "../../listings/", productType);
        fs.writeFileSync(path.resolve(productTypePath, `${design.id}.html`), this.template);
      });
    });
  }
}

module.exports = ProductPageRenderer;
