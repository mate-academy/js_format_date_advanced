'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultDate = [];
  const dateObj = {};
  const splitedDate = date.split(fromFormat[3]);

  for (let i = 0; i < splitedDate.length; i++) {
    dateObj[fromFormat[i]] = splitedDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && dateObj.hasOwnProperty('YY')) {
      const firstPartOfYear = +dateObj['YY'] < 30 ? 20 : 19;

      resultDate.push(`${firstPartOfYear}${dateObj['YY']}`);

      continue;
    }

    if (toFormat[i] === 'YY' && dateObj.hasOwnProperty('YYYY')) {
      resultDate.push(dateObj['YYYY'].slice(2));

      continue;
    }

    resultDate.push(dateObj[toFormat[i]]);
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
