/**
 * init
 */
require('console-color-mr');  // 命令行样式

const fs = require('fs');
const path = require('path');
const program = require('commander');

const componentDir = path.resolve(__dirname, '../');
// console.log('componentDir: ', componentDir);

// 获取目录树初始化
function getDirTreeInit() {
  program
    .version('0.0.1')
    .option('-i --i [i]', 'ignore file or files')
    .option('-c --c [c]', 'contain file or files')
    .parse(process.argv);
  
  // log('program.i: ', program.i);
  // log('program.c: ', program.c);

  // 接受命令行参数 npm run gettreer:i ["/node_modules|.git/"]
  let reg = program.i || program.c || '/node_modules|.git/i';
  process.env.getDirTreeType = program.c ? 'c' : 'i'; // 忽略过滤ignore
  process.env.getDirTreeReg = reg; // 正则表达式

  // 默认过滤掉 'node_modules|.git'
  // 设置类型和过滤正则表达式
  // process.env.getDirTreeType = 'i'; // 忽略过滤ignore
  // process.env.getDirTreeReg = '/node_modules|.git/i'; // 正则表达式
  // process.env.getDirTreeType = 'c'; // 包含过滤contain
  // process.env.getDirTreeReg = 'components'; // 正则表达式

  const { getDirTree, getDirName }  = require('./file.js');

  let treeObj = getDirTree(componentDir);
  // console.log('treeObj: ',treeObj);

  if (treeObj) {
    let outdir = `${__dirname}\\${getDirName(componentDir)}-dir-tree.json`;

    // 写入文件
    fs.writeFile(outdir, JSON.stringify(treeObj, '', '\t'), 'utf8', (err) => {
      if (err) throw err;
      console.log(`目录树已输出为文件保存: ${outdir}`.greenBG);
    });
  }
}

const ComponentInit = (function init() {
  console.log('______ init ______'.blueBG, '\n');

  getDirTreeInit();

  return init;
})();

module.exports = ComponentInit;
