class Module {
  constructor(options = {}) {
    this.options = options;
    this.initialize();
  }

  initialize() {}
  execute() {}
}

module.exports = Module;
