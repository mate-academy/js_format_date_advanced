'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const a = fromFormat[3];
  const b = toFormat[3];
  const newDate = date.split(a);
  const arr = [];
  const obj = {};

  for (let i = 0; i < newDate.length; i++) {
    obj[fromFormat[i]] = newDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const x = obj.YY;

    delete obj.YY;

    if (+x < 30) {
      obj.YYYY = '20' + x;
    } else {
      obj.YYYY = '19' + x;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const x = obj.YYYY.slice(2);

    delete obj.YYYY;
    obj.YY = x;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    arr.push(obj[toFormat[i]]);
  };

  return arr.join(b);
}

module.exports = formatDate;
