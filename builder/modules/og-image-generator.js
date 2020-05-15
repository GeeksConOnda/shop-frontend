const Module = require("./module");

const log = require("debug")("og-image-generator");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

class OGImageGenerator extends Module {
  execute() {
    const { image, color } = this.options;
    const newImageDestinationFile = `${path.dirname(image)}/../og/${path.basename(image)}`;
    return new Promise((resolve, reject) => {
      new Jimp(600, 600, color, (err, coloredProductImage) => {
        if (err) {
          reject(err);
          return;
        }

        Jimp.read(image).then(baseProductImage => {
          coloredProductImage.composite(baseProductImage, 0, 0, Jimp.BLEND_SOURCE_OVER);
          coloredProductImage.write(newImageDestinationFile, resolve);
        });
      });
    });
  }
}

module.exports = OGImageGenerator;
