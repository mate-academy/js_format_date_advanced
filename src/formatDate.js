'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDevider = fromFormat[3];
  const newDevider = toFormat[3];
  const dateArr = date.split(oldDevider);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let newPos = toFormat.indexOf(fromFormat[i]);

    if (newPos < 0 && fromFormat[i].length === 2) {
      newPos = toFormat.indexOf('YYYY');

      let year = dateArr[i];

      if (year < 30) {
        year = `20${year}`;
      } else {
        year = `19${year}`;
      }

      result[newPos] = year;
    } else if (newPos < 0 && fromFormat[i].length === 4) {
      newPos = toFormat.indexOf('YY');

      const year = dateArr[i].split('').slice(-2).join('');

      result[newPos] = year;
    } else {
      result[newPos] = dateArr[i];
    }
  }

  return result.join(newDevider);
}

module.exports = formatDate;
