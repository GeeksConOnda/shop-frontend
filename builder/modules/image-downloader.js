const Module = require("./module");

const log = require("debug")("image-downloader");
const fs = require("fs");
const path = require("path");
const https = require("https");

class ImageDownloader extends Module {
  execute() {
    return new Promise((resolve, reject) => {
      const { url, imageFileName } = this.options;
      const targetFileName = path.resolve(__dirname, `../../images/products/fc/${imageFileName}`);
      const imageStream = fs.createWriteStream(targetFileName);
      imageStream.on("finish", () => {
        log("downloaded: ", url);
        resolve(targetFileName);
      });
      https.get(url, (response) => response.pipe(imageStream));
    });
  }
}

module.exports = ImageDownloader;
