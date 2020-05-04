const Module = require("./module");

const fs = require("fs");
const path = require("path");
const log = require("debug")("template-loader");

class TemplateLoader extends Module {
  execute() {
    const templates = this.options.templateKeys.map(templateKey => {
      const data = fs.readFileSync(path.resolve(__dirname, `../templates/${templateKey}.html`)).toString("utf8");
      return {[templateKey]: data};
    }).reduce((templates, template) => ({...templates, ...template}), {});

    log("Loaded %s templates", this.options.templateKeys.length);

    return templates;
  }
}

module.exports = TemplateLoader;
