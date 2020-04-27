const fs = require("fs");
const path = require("path");
const https = require("https");
const designs = require(path.resolve(__dirname, "../api/data/designs.json"));
const donations = require(path.resolve(__dirname, "../api/data/donations.json"));
const pageTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/page.html"));
const productTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/product-box.html"));
const productPageTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/product-page.html"));
const donationBoxTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/donation-box.html"));

const withProductType = (productType) => design => Object.keys(design.products).filter(product => product.startsWith(productType));

const colorNames = {
  "#546e7a": "Gris azulado",
  "#757575": "Gris polvo",
  "#6d4c41": "Marrón",
  "#f4511e": "Naranja rojizo",
  "#fb8c00": "Naranja puro",
  "#ffb300": "Naranja claro",
  "#fdd835": "Amarillo",
  "#c0ca33": "Verde oliva",
  "#a0ce4e": "Verde natural",
  "#7cb342": "Verde lima",
  "#43a047": "Verde del Amazonas",
  "#00897b": "Verde azulado",
  "#00acc1": "Azul claro",
  "#3fc7ba": "Turquesa",
  "#039be5": "Celeste",
  "#3949ab": "Azul",
  "#5e35b1": "Violeta",
  "#8e24aa": "Púrpura",
  "#d81b60": "Fucsia",
  "#eeeeee": "Blanco de zinc",
  "#ffffff": "Blanco puro",
  "#3a3a3a": "Gris de carbonilla",
  "#b20003": "Rojo",
  "#0b0e30": "Azul marino",
  "#050505": "Negro",
  "#f9bdda": "Rosa",
  "#c5f7c7": "Verde claro",
  "#acdced": "Celeste claro",
  "#cccccc": "Gris ceniza",
  "#faf4af": "Amarillo claro",
  "#f2f2f2": "Blanco niebla",
  "#666666": "Gris de plomo",
  "#595959": "Gris metal",
  "#edeff2": "Blanco frío",
  "#121533": "Azul cobalto",
  "#fcf0de": "Beige claro",
  "#2b3f77": "Azul jean"
};

const titles = {
  "t-shirt-male": "Remeras de corte recto, cuello redondo",
  "t-shirt-male-v-neck": "Remeras de corte recto, cuello en V",
  "t-shirt-female": "Remeras de corte entallado",
  "t-shirt-kids": "Remeras para niñas y niños",
  "t-shirt-baby": "Remeras para bebés",
  "kimono": "Kimonos",
  "bathing-suit": "Trajes de baño",
  "hoodie": "Buzos tipo canguro",
  "hoodie-zip": "Buzos tipo canguro, con cierre",
  "bag": "Bolsas de tela",
  "poster": "Cuadros",
  "postcard": "Postales",
  "sneakers-male": "Zapatillas de talle grande",
  "sneakers-female": "Zapatillas de talle pequeño",
  "pillow": "Almohadones",
  "stickers": "Stickers",
  "metal-stickers": "Stickers metalizados",
  "shirts": "Camisas de jean"
};

const paths = {
  "t-shirt-male": "/remeras/corte-recto",
  "t-shirt-male-v-neck": "/remeras/corte-recto-cuello-v",
  "t-shirt-female": "/remeras/corte-entallado",
  "t-shirt-kids": "/remeras/para-chicas-y-chicos",
  "t-shirt-baby": "/remeras/para-bebes",
  "hoodie": "/buzos/canguro",
  "hoodie-zip": "/buzos/con-cierre",
  "bag": "/bolsas-de-tela",
  "poster": "/cuadros",
  "postcard": "/postales",
  "sneakers-male": "/zapatillas/talle-grande",
  "sneakers-female": "/zapatillas/talle-chico",
  "pillow": "/almohadones",
  "stickers": "/stickers/mate",
  "metal-stickers": "/stickers/metalizados",
  "shirts": "/camisas"
};

const productTypeInfoTemplates = Object.keys(titles).map(key => ({
  [key]: fs.readFileSync(path.resolve(__dirname, `../templates/product-info/${key}.html`)).toString("utf8").trim()
})).reduce((previousData, data) => ({...previousData, ...data}), {});

const listingOutputFiles = [
  {
    file: "t-shirts.html",
    types: ["t-shirt-male", "t-shirt-male-v-neck", "t-shirt-female", "t-shirt-kids", "t-shirt-baby"],
    category: "Remeras",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "hoodies.html",
    types: ["hoodie", "hoodie-zip"],
    category: "Buzos",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "tote-bags.html",
    types: ["bag"],
    category: "Bolsas de tela",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "posters.html",
    types: ["poster"],
    category: "Cuadros",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "postcards.html",
    types: ["postcard"],
    category: "Postales",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "sneakers.html",
    types: ["sneakers-male", "sneakers-female"],
    category: "Zapatillas",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "pillows.html",
    types: ["pillow"],
    category: "Almohadones",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "stickers.html",
    types: ["stickers", "metal-stickers"],
    category: "Stickers",
    iWantThis: "Comprar en FlashCookie"
  },
  {
    file: "shirts.html",
    types: ["shirts"],
    category: "Camisas",
    iWantThis: "Comprar en FlashCookie"
  }
];

listingOutputFiles.forEach(({ file, types, category, iWantThis }) => {
  const products = [];
  let count = 0;
  types.forEach((productType) => {
    products.push(`<h2 class="product__type">${titles[productType]}</h2><section class="product-group">`);
    designs.filter(withProductType(productType)).forEach(design => {
      if (!design.products[productType]) {
        return;
      }

      console.log("Generating: ", category, " > ", design.title);
      const productTypePath = path.resolve(__dirname, "../listings/", productType);
      const imageFileName = design.products[productType].images[0].split("/").pop();
      const imageStream = fs.createWriteStream(path.resolve(__dirname, `../images/products/fc/${imageFileName}`));
      console.log("-- Downloading: ", design.products[productType].images[0]);
      const download = https.get(design.products[productType].images[0], (response) => response.pipe(imageStream));
      products.push(`${productTemplate}`
      .replace(/<%ID%>/g, design.id)
      .replace(/<%INDEX%>/g, count)
      .replace(/<%NAME%>/g, design.title)
      .replace(/<%BASE_COLOR%>/g, design.canRestrictColors ? design.baseColor : design.products[productType].colors[0])
      .replace(/<%DESCRIPTION%>/g, design.description)
      .replace(/<%IMAGE_URL%>/g, `/images/products/fc/${imageFileName}`)
      .replace(/<%PRICE%>/g, design.products[productType].price)
      .replace(/<%COLORS%>/g, design.products[productType].colors.map(color => `<li style="background-color: ${color}">&nbsp;</li>`).join(""))
      .replace(/<%COLORS_TEXT%>/g, design.products[productType].colors.map(color => colorNames[color]).join(", "))
      .replace(/<%PRODUCT_URL%>/g, design.products[productType].href)
      .replace(/<%PRODUCT_PAGE%>/g, `${paths[productType]}/${design.id}`)
      .replace(/<%LIST_URL%>/g, `https://geekscononda.com/${path.basename(file, ".html")}`)
      .replace(/<%URL%>/g, design.products[productType].href)
      .replace(/<%PRICE_EXPIRATION%>/g, "2020-12-31")
      .replace(/<%PRODUCT_TYPE%>/g, titles[productType])
      .replace(/<%I_WANT_THIS%>/g, iWantThis)
      );

      let productPage = `${productPageTemplate}`
      .replace(/<%ID%>/g, design.id)
      .replace(/<%NAME%>/g, design.title)
      .replace(/<%BASE_COLOR%>/g, design.canRestrictColors ? design.baseColor : design.products[productType].colors[0])
      .replace(/<%DESCRIPTION%>/g, design.description)
      .replace(/<%IMAGE_URL%>/g, `/images/products/fc/${imageFileName}`)
      .replace(/<%PRICE%>/g, design.products[productType].price)
      .replace(/<%COLORS%>/g, design.products[productType].colors.map(color => `<li style="background-color: ${color}">&nbsp;</li>`).join(""))
      .replace(/<%COLORS_TEXT%>/g, design.products[productType].colors.map(color => colorNames[color]).join(", "))
      .replace(/<%PRODUCT_URL%>/g, design.products[productType].href)
      .replace(/<%LIST_URL%>/g, `https://geekscononda.com/${path.basename(file)}`)
      .replace(/<%URL%>/g, design.products[productType].href)
      .replace(/<%PRICE_EXPIRATION%>/g, "2020-12-31")
      .replace(/<%PRODUCT_TYPE%>/g, titles[productType])
      .replace(/<%I_WANT_THIS%>/g, iWantThis)
      .replace(/<%PRODUCT_LISTING_URL%>/g, `https://geekscononda.com${paths[productType]}/${design.id}`)
      .replace(/<%PRODUCT_TYPE_INFO%>/g, `${productTypeInfoTemplates[productType]}`)

      listingOutputFiles.forEach(listing => {
        productPage = productPage.replace(new RegExp(`%ACTIVE_${path.basename(listing.file, ".html").toUpperCase()}%`),
        listing.file === file ? `class="active"` : ``);
      });

      if (donations[design.id]) {
        const donation = donations[design.id];
        const donationBox = `${donationBoxTemplate}`
        .replace(/<%BENEFACTOR_HREF%>/g, donation.benefactor.href)
        .replace(/<%BENEFACTOR_NAME%>/g, donation.benefactor.name)
        .replace(/<%GCO_DISTRIBUTION%>/g, donation.distributions.gco)
        .replace(/<%BENEFACTOR_DISTRIBUTION%>/g, donation.distributions.benefactor)
        .replace(/<%TAXES_DISTRIBUTION%>/g, donation.distributions.taxes)
        productPage = productPage.replace(/<%DONATION_BOX%>/g, donationBox);
      } else {
        productPage = productPage.replace(/<%DONATION_BOX%>/g, "");
      }

      fs.writeFileSync(path.resolve(productTypePath, `${design.id}.html`), productPage);

      count += 1;
    });
    products.push("</section>");
  });

  const page = `${pageTemplate}`.replace("<%CONTENT%>", products.join("")).replace("<%PRODUCT_TYPE%>", category);

  fs.writeFileSync(path.resolve(__dirname, `../listings/${file}`), page);
});
