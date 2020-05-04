const Module = require("./module");

const log = require("debug")("image-downloader");
const fs = require("fs");
const path = require("path");
const https = require("https");

class ImageDownloader extends Module {
  execute() {
    return new Promise((resolve, reject) => {
      const { url, imageFileName } = this.options;
      const imageStream = fs.createWriteStream(path.resolve(__dirname, `../../images/products/fc/${imageFileName}`));
      imageStream.on("finish", () => {
        log("downloaded: ", url);
        resolve();
      });
      https.get(url, (response) => response.pipe(imageStream));
    });
  }
}

module.exports = ImageDownloader;
