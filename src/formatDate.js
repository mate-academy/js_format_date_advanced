'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const INDEX_OF_DELIMETER = 3;
  const datePart = date.split(fromFormat[INDEX_OF_DELIMETER]);
  const result = [];

  let oldYearPos = 0;
  let oldMonthPos = 0;
  let oldDayPos = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].startsWith('YY')) {
      oldYearPos = i;
    } else if (fromFormat[i] === 'MM') {
      oldMonthPos = i;
    } else {
      oldDayPos = i;
    }
  }

  for (const part of toFormat) {
    if (part.startsWith('YY')) {
      if (part === 'YYYY' && fromFormat[oldYearPos] === 'YY') {
        if (+datePart[oldYearPos] < 30) {
          result.push('20' + datePart[oldYearPos]);
        } else {
          result.push('19' + datePart[oldYearPos]);
        }
      } else if (part === 'YY' && fromFormat[oldYearPos] === 'YYYY') {
        result.push(datePart[oldYearPos].slice(2));
      } else {
        result.push(datePart[oldYearPos]);
      }
    } else if (part === 'MM') {
      result.push(datePart[oldMonthPos]);
    } else if (part === 'DD') {
      result.push(datePart[oldDayPos]);
    }
  }

  return result.join(toFormat[INDEX_OF_DELIMETER]);
}

module.exports = formatDate;
