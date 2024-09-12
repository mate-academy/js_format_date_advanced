'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DATE_PARTS = date.split(fromFormat[fromFormat.length - 1]);
  let newDate = '';

  if (toFormat[0] === 'DD') {
    for (let i = 0; i < toFormat.length - 1; i++) {
      const INDEX = fromFormat.indexOf(toFormat[i]);

      if (INDEX !== -1) {
        if (fromFormat[INDEX] === 'YYYY' && toFormat[i] === 'YY') {
          newDate += DATE_PARTS[INDEX].slice(-2);
        } else {
          newDate += DATE_PARTS[INDEX];
        }
      } else if (toFormat[i] === 'YYYY') {
        const YEAR_INDEX = toFormat.indexOf('YYYY');
        const YEAR = DATE_PARTS[YEAR_INDEX];

        newDate += YEAR;
      } else if (toFormat[i] === 'YY') {
        const YEAR_INDEX = toFormat.indexOf('YY');
        const YEAR = DATE_PARTS[YEAR_INDEX].slice(-2);

        newDate += YEAR;
      } else {
        newDate += toFormat[i];
      }

      if (i !== toFormat.length - 2) {
        newDate += toFormat[toFormat.length - 1];
      }
    }
  } else {
    for (let i = 0; i < toFormat.length - 1; i++) {
      const INDEX = toFormat.indexOf(toFormat[i]);

      if (INDEX !== -1) {
        if (fromFormat[INDEX] === 'YY' && toFormat[i] === 'YYYY') {
          newDate += DATE_PARTS[INDEX] < 30 ? '20' : '19';
        }

        if (fromFormat[INDEX] === 'YYYY' && toFormat[i] === 'YY') {
          newDate += DATE_PARTS[INDEX].slice(-2);
        } else {
          newDate += DATE_PARTS[INDEX];
        }
      }

      if (i !== toFormat.length - 2) {
        newDate += toFormat[toFormat.length - 1];
      }
    }
  }

  return newDate;
}

module.exports = formatDate;
