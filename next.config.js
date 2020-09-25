const withStyles = require('@webdeb/next-styles');

module.exports = withStyles({
  distDir: 'build',
  less: true, // use .less files
  modules: true, // style.(m|module).css & style.(m|module).scss for module files
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    url: false
  }
})