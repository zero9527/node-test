const fs = require('fs');
const path = require('path');
const program = require('commander'); // 命令参数处理
const inquirer = require('inquirer'); // 选择
const chalk = require('chalk');

const log = (...text) => console.log(...text);
const componentDir = path.resolve(__dirname, '../components');

const newComp = `
const fs = require('fs');
const path = require('path');

console.log('这是一个自动生成的component');
`;

// npm scripts不能接收参数
// 下面需要 node 运行传入参数
program
  .version('0.0.1')
  .option('-l --path [path]', 'list of customers in CSV file')
  .parse(process.argv);

// node scripts/generateComponents --path inputName
const inputName = program.path;
log('\ninputName: ',inputName);

const questions = [
  {
    type: "confirm",
    name: "override",
    message: "是否覆盖？"
  }
];

mkdir(componentDir + `\\${inputName||'noname'}`)
.then(path => {
  log('\n开始生成文件...');

  return new Promise((resolve) => {
    fs.writeFile(path+'\\index.js', newComp, 'utf-8', err => {
      if (err) throw err;
      
      log(`\n${path}\\index.js 文件创建成功！\n`);
      resolve();
    });
  });

}).catch(err => {
  throw err;
});

// 创建目录
function mkdir(path) {
  return new Promise((resolve) => {
    if (fs.existsSync(path)) {
      log(`\n${path}: 文件夹已存在`);

      // 命令行交互
      inquirer.prompt(questions).then(res => {  
        if (res.override) {
          log('\n文件将被覆盖！');
          resolve(path);

        } else {
          log('\n不覆盖已有文件！');
          
        }
      });

    } else {
      fs.mkdirSync(path);
      
      log('\n文件夹创建成功！');
      resolve(path);
    }
  })
}

module.export = {
  mkdir
}
