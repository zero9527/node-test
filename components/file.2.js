/**
 * 文件管理
 */
const fs = require('fs');
// 获取获取目录的类型，过滤i: ignore/包含c: contain
const type = process.env.getDirTreeType;
// 正则表达式 ["/node_modules|.git/i"]
let reg = process.env.getDirTreeReg;

// 正则表达式转换
let modifier = reg.substring(reg.lastIndexOf('/')+1, reg.lastIndexOf(']')) || 'i'; // 修饰符
reg = reg.substring(reg.indexOf('/')+1, reg.lastIndexOf('/')); // 截取表达式模型

reg = new RegExp(reg, modifier); // 生成正则表达式

// log('reg: ',reg);
// log('modifier: ',modifier);
// log('type: ',type);

let firstRun = true; // getDirTree首次执行
let output = ''; // 生成目录结构字符串
/**
 * 获取目录下的文件树
 * @param {读取的路径} dir 
 * @returns 返回 dir目录下的文件树
 */
function getDirTree(dir) {
  let obj = {
    dir: dir,
    childFiles: [],
    childDir: {}
  };
  let objStr = JSON.stringify(obj);
  if (firstRun && isFile(dir)) return console.log(`${dir}: 不是文件夹`.redBG);

  let files = readDir(dir);
  
  if (firstRun) {
    output=`${dir}\n`;
    // 根据正则过滤文件、文件夹
    files = filesFilter(files);
    // 过滤之后的文件、文件夹列表
    log('files: ', files);
  }

  firstRun = false;

  // 遍历文件
  files.forEach((file, index) => {
    let tempdir = `${dir}\\${file}`;
    let dirname = getDirName(tempdir);
    // dir深度
    let dirDeep = new Array(tempdir.split('\\').length - 2).fill(0);
    
    // 组装目录结构
    dirDeep = dirDeep.reduce((acc,cur) => 
      acc = (dirDeep.length > 1 ? '  ' : '') + acc, 
      index === files.length - 1 ? '└─ ' : '├─ '
    );
    
    output += `${dirDeep}${dirname}\n`;

    if (isFile(tempdir)) {
      obj.childFiles.push({
        short: file, // 文件名
        full: tempdir // 完整路径
      });
      
    } else {
      // 在当前文件夹的对象下 childDir 属性(1)，以文件夹名作为key(2)，
      // (2)的值是该目录下 路径dir、childFiles子文件、childDir子文件夹组成的对象或null
      obj.childDir[dirname] = getDirTree(tempdir);
    }
  });
  obj.output = output;
  return JSON.stringify(obj) === objStr ? null : obj;
}

// 根据正则过滤文件、文件夹
function filesFilter(files) {
  switch (type) {
    case 'i': // 过滤掉忽略的文件、文件夹
      files = files.filter(item => !reg.test(item));
      break;
    case 'c': // 包含
      files = files.filter(item => reg.test(item));
      break;
    default:
      break;
  }
  return files;
}

// 读取路径下的文件、文件夹
function readDir(dir) {
  return fs.readdirSync(dir, (err, files) => {
    if (err) throw err;
    if (firstRun && !files.length) console.log(`${dir}: 文件夹为空`.redBG);
    return files;
  })
}

// 判断制定路径是否是文件
function isFile(dir) {
  return fs.statSync(dir).isFile();
}

// 获取目录名
function getDirName(dir) {
  let tempdir = dir.substr(dir.lastIndexOf('\\')+1, dir.length);
  return tempdir;
}

// const components_out = readFile(path.resolve(__dirname, './components-dir-tree.json'));
// console.log('components-dir-tree: ', components_out);

// 读取指定目录的文件
function readFile(dir) {
  let result = fs.readFileSync(dir, 'utf-8');
  return (
    result 
    ? {
      dir: dir,
      result: result
    } 
    : null
  );
}

module.exports = {
  getDirTree,
  readDir,
  isFile,
  getDirName,
  readFile
}