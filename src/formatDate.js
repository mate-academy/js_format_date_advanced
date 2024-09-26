'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  const dateArrResult = [];

  for (let i = 0; i < 3; i++) {
    let element = dateObj[toFormat[i]];

    if (toFormat[i] === 'YYYY' & fromFormat.includes('YY')) {
      element = (dateObj['YY'] < 30) ? `20${dateObj['YY']}`
        : `19${dateObj['YY']}`;
    } else if (toFormat[i] === 'YY' & fromFormat.includes('YYYY')) {
      element = dateObj['YYYY'].slice(2, 5);
    }
    dateArrResult.push(element);
  }

  const result = dateArrResult.join((toFormat[3]));

  return result;
}

module.exports = formatDate;
