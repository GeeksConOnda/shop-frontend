const Module = require("./module");
const debug = require("debug");
const log = debug("renderer:core");

class Renderer extends Module {
  runReplacers() {
    this.replacerFunctions.forEach(replacer => {
      this.template = replacer.call(this, this.template);
    });
  }

  initialize() {
    this.log = debug(`renderer:${this.constructor.name.replace("Renderer", "")}`);

    this.replacerNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(key => key.startsWith("apply") && this[key].call);
    this.replacerFunctions = this.replacerNames.map(key => this[key]);
  }

  execute() {
    const { template } = this.options;

    this.template = `${template}`;
    this.runReplacers();

    return this.template;
  }
}

module.exports = Renderer;
