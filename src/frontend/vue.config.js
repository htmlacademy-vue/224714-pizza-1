const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/ds-system/ds.scss";',
      },
    },
  },

  devServer: {
    proxy: {
      "^/api": {
        target: "https://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/api/": "/" },
      },
      "^/public": {
        target: "http://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/public/": "/public/" },
      },
      "/explorer": {
        target: "http://backend:3000/",
        changeOrigin: false,
        proxyTimeout: 1000 * 60 * 10,
        pathRewrite: { "/docs/explorer": "/explorer" },
      },
    },

    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
