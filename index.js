require('console-color-mr');  // console样式自定义

require('./components/log');
require("./components");

// console.log('components: ', components)

const APP_NAME = "node-test";

const App = (function Index() {
  // console.log('index_ func');
  process.env.APP_NAME = APP_NAME;
  // process.env.NODE_TEST_ENV = 'dev-test';

})();

module.exports = App;
