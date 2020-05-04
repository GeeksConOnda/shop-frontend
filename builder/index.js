const CATEGORIES = require("./configuration/categories.json");
const DESIGNS = require("./configuration/designs.json");
const PAGES = require("./configuration/pages.json");

const TemplateLoader = require("./modules/template-loader");
const ListingByCategoryRenderer = require("./modules/listing-by-category-renderer");
const ListingByCollectionRenderer = require("./modules/listing-by-collection-renderer");
const ProductPageRenderer = require("./modules/product-page-renderer");

const templateKeys = ["listing-page", "product-page", "donation-box", "product-box", "collection-item-box", "collection-page", "menu-box"].concat(
  Object.keys(CATEGORIES).map(templateKey => `products/${templateKey}`)
);

const TEMPLATES = new TemplateLoader({ templateKeys }).execute();

[
  new ListingByCategoryRenderer({
    pages: PAGES,
    template: TEMPLATES["listing-page"],
    productBoxTemplate: TEMPLATES["product-box"],
    menuBoxTemplate: TEMPLATES["menu-box"]
  }),

  new ProductPageRenderer({
    designs: DESIGNS,
    template: TEMPLATES["product-page"],
    templates: TEMPLATES,
    donationBoxTemplate: TEMPLATES["donation-box"],
    menuBoxTemplate: TEMPLATES["menu-box"]
  }),

  new ListingByCollectionRenderer({
    designs: DESIGNS,
    template: TEMPLATES["collection-page"],
    collectionItemBoxTemplate: TEMPLATES["collection-item-box"],
    menuBoxTemplate: TEMPLATES["menu-box"],
    donationBoxTemplate: TEMPLATES["donation-box"]
  })
].forEach(renderer => renderer.execute());
