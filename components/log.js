require('console-color-mr');  // 命令行样式

// console.log 简写，注入到 node.js全局
if (global.log) return;
global.log = function(...param){
  console.log('==log=='.yellow, '\n' , ...param);
}
