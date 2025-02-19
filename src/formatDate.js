'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(fromFormat[3]);

  const objDate = {};
  const result = [];

  for (let i = 0; i < arrayDate.length; i++) {
    objDate[fromFormat[i]] = arrayDate[i];
  }

  toFormat.map((e) => {
    switch (e) {
      case 'MM':
        result.push(objDate.MM);
        break;
      case 'DD':
        result.push(objDate.DD);
        break;
      case 'YY':
        if (fromFormat.includes('YYYY')) {
          result.push(objDate.YYYY.substr(2));
        } else {
          result.push(objDate.YY);
        }
        break;
      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          result.push(objDate.YYYY);
        } else {
          if (objDate.YY < 30) {
            result.push('20' + objDate.YY);
          } else {
            result.push('19' + objDate.YY);
          }
        }
        break;
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
