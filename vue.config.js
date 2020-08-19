// vue.config.js for less-loader@6.0.0
module.exports = {
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#8d6449',
              'link-color': '#98623c',
              'border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  };