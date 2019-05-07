const fs = require('fs');

const isDir = dir => fs.statSync(dir).isDirectory();

/**
 * 返回相关的shell脚本
 */

 // 打印指定目录
function ls(dir=null) {
  if (dir) {
    log('dir: ', dir);
    return `cd ${dir} && ls`;
  }
  return "ls";
}

/**
 * 构建前端项目
 * @param {项目路径} dir 
 * @param {执行的 npm 命令} cmd 
 */
function buildFE(dir, cmd) {
  if (!dir || !isDir(dir) || !cmd) return;
  log('build-dir: ', dir);
  return `cd ${dir} && ${cmd}`;
}

module.exports = {
  ls,
  buildFE
}
