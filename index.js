require('console-color-mr');  // console样式自定义

// const components = require("./components");

// console.log('components: ', components)

const APP_NAME = "node-test";

const App = (function Index() {
  // console.log('index_ func');
  process.env.APP_NAME = APP_NAME;
  // process.env.NODE_TEST_ENV = 'dev-test';

})();

function fetchApi(num) {
  return new Promise((resolve, reject) => {
    if (num > 5) resolve(num);
    else reject(num);
  })
}

const aa = async (num) => {
  try {
    let res = await fetchApi(num);
    console.log('res: ',res);
  } catch (err) {
    console.error('err: ',err);
  }
}

aa(8); // res: 8
aa(4); // err: 4

module.exports = App;
