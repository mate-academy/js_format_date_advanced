'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const day = fromFormat.indexOf('DD');
  const month = fromFormat.indexOf('MM');
  const year = fromFormat.findIndex(f => f === 'YYYY' || f === 'YY');

  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  let result = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      result[i] = splitDate[day];
    }
    if (toFormat[i] === 'MM') {
      result[i] = splitDate[month];
    }
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (toFormat[i] === 'YY') {
        result[i] = splitDate[year].slice(2);
      } else {
        if (splitDate[year].length === 2) {
          if (+splitDate[year] < 30) {
            result[i] = '20' + splitDate[year];
          } else {
            result[i] = '19' + splitDate[year];
          }
        } else {
          result[i] = splitDate[year];
        }
      }
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
