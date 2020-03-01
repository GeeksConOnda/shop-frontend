module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/components/_variables.scss";
        `
      }
    }
  }
};
