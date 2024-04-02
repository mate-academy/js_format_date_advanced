'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const resultArray = [];
  const dateArray = date.split(OLD_SEPARATOR);

  const obj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
      case 'MM':
      case 'DD':
        obj[fromFormat[i]] = dateArray[i];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (key === 'YY' && fromFormat.includes('YYYY')) {
      const year = parseInt(obj['YYYY'].slice(-2));

      resultArray.push(year);
    } else if (key === 'YYYY' && fromFormat.includes('YY')) {
      const year = parseInt(obj['YY']);

      resultArray.push(year < 30 ? 2000 + year : 1900 + year);
    } else {
      resultArray.push(obj[key]);
    }
  }

  return resultArray.join(NEW_SEPARATOR);
}

module.exports = formatDate;
