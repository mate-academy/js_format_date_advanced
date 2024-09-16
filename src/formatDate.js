'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormat = fromFormat.splice(' ');
  const newDate = date.split(newFormat[3]);
  const objStart = {};

  for (const key in newDate) {
    objStart[newFormat[key]] = newDate[key];
  }

  let result = '';

  for (const key of toFormat.slice(0, 3)) {
    if (key === 'YY' && !('YY' in objStart)) {
      objStart['YY'] = objStart['YYYY'].slice(2);
    } else if (key === 'YYYY' && !('YYYY' in objStart)) {
      if (+objStart.YY < 30) {
        objStart['YYYY'] = +'20' + objStart.YY;
      } else {
        objStart['YYYY'] = +'19' + objStart.YY;
      }
    }

    result += objStart[key] + toFormat[3];
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
