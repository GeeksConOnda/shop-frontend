const fs = require("fs");
const path = require("path");
const designs = require(path.resolve(__dirname, "../api/data/designs.json"));
const pageTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/page.html"));
const productTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/product-box.html"));
const withProductType = (productType) => design => Object.keys(design.products).filter(product => product.startsWith(productType));

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
    "pillow": "Almohadones"
};

const listingOutputFiles = [
    {
        file: "t-shirts.html",
        types: ["t-shirt-male", "t-shirt-male-v-neck", "t-shirt-female", "t-shirt-kids", "t-shirt-baby"],
        category: "Remeras",
        iWantThis: "Quiero esta remera"
    },
    {
        file: "hoodies.html",
        types: ["hoodie", "hoodie-zip"],
        category: "Buzos",
        iWantThis: "Quiero este buzo"
    },
    {
        file: "tote-bags.html",
        types: ["bag"],
        category: "Bolsas de tela",
        iWantThis: "Quiero esta bolsa"
    },
    {
        file: "posters.html",
        types: ["poster"],
        category: "Cuadros",
        iWantThis: "Quiero este cuadro"
    },
    {
        file: "postcards.html",
        types: ["postcard"],
        category: "Postales",
        iWantThis: "Quiero esta postal"
    },
    {
        file: "sneakers.html",
        types: ["sneakers-male", "sneakers-female"],
        category: "Zapatillas",
        iWantThis: "Quiero estas zapatillas"
    },
    {
        file: "pillows.html",
        types: ["pillow"],
        category: "Almohadones",
        iWantThis: "Quiero este almohadón"
    }
];
    
listingOutputFiles.forEach(({ file, types, category, iWantThis }) => {
    const products = [];
    types.forEach((productType) => {
        products.push(`<h2 class="product__type">${titles[productType]}</h2><section class="product-group">`);
        designs.filter(withProductType(productType)).forEach(design => {
            if (!design.products[productType]) {
                return;
            }

            products.push(`${productTemplate}`
                .replace(/<%ID%>/g, design.id)
                .replace(/<%NAME%>/g, design.title)
                .replace(/<%BASE_COLOR%>/g, design.canRestrictColors ? design.baseColor : design.products[productType].colors[0])
                .replace(/<%DESCRIPTION%>/g, design.description)
                .replace(/<%IMAGE_URL%>/g, design.products[productType].images[0])
                .replace(/<%PRICE%>/g, design.products[productType].price)
                .replace(/<%COLORS%>/g, design.products[productType].colors.map(color => `<li style="background-color: ${color}">&nbsp;</li>`).join(""))
                .replace(/<%PRODUCT_URL%>/g, design.products[productType].href)
                .replace(/<%PRICE_EXPIRATION%>/g, "2020-12-31")
                .replace(/<%PRODUCT_TYPE%>/g, titles[productType])
                .replace(/<%I_WANT_THIS%>/g, iWantThis)
            );
        });
        products.push("</section>");
    });

    const page = `${pageTemplate}`.replace("<%CONTENT%>", products.join("")).replace("<%PRODUCT_TYPE%>", category);

    fs.writeFileSync(path.resolve(__dirname, `../listings/${file}`), page);
});
