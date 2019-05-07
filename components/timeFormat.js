/**
 * 时间格式化
 * @param {时间戳，毫秒} timestamp 
 * @param {分隔符, 默认'-'} seperator 
 */
function timeFormat({ timestamp, seperator='-', hasTime=false }){
  let time = timestamp ? new Date(timestamp) : new Date();
  if (time.toString() === 'Invalid Date') time = new Date();

  let Y = time.getFullYear();
  let M = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth();
  let D = time.getDate() + 1 < 10 ? `0${time.getDate() + 1}` : time.getDate();

  if (hasTime) { // 包含时间
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    return `${Y}${seperator}${M}${seperator}${D} ${h}:${m}:${s}`;
  }
  // 日期
  return `${Y}${seperator}${M}${seperator}${D}`;
}

module.exports = timeFormat;
