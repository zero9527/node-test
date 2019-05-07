// exec 执行shell命令
const { exec } = require('child_process');
const path = require('path');
require('./log');
const timeFormat = require('./timeFormat');
const { ls, buildFE } = require('../sh/sh1.js');
// console.log('sh: ',sh);

const shdir = path.resolve(__dirname, '../sh');

// 打印指定路径目录
exec(ls('/code/react-t1'), (err, stdout, stderr) => {
  if (err) throw err;
  if ( stderr) log('stderr: ', stderr);
  
  // 执行的命令所打印的内容
  log('stdout: ', stdout);

  let nowTime = timeFormat({timestamp: new Date(), hasTime: true });
  log('time: ', nowTime);
})


let nowTime = timeFormat({timestamp: new Date(), hasTime: true });
log('start--time: ', nowTime);

exec(buildFE('/code/react-t1', 'npm run build'), (err, stdout, stderr) => {
  if (err) throw err;
  if ( stderr) log('stderr: ', stderr);

  // 执行的命令所打印的内容
  log('stdout: ', stdout);

  nowTime = timeFormat({timestamp: new Date(), hasTime: true });
  log('end--time: ', nowTime);
})
