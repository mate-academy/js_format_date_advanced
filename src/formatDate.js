'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const separator2 = toFormat[toFormat.length - 1];

  const curDate = date.split(separator);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      result.push(curDate[i].slice(-2));
      continue;
    }

    if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
      let curYear = curDate[i];

      if (curYear < 30) {
        curYear = '20' + curYear;
      } else {
        curYear = '19' + curYear;
      }

      result.push(curYear);
      continue;
    }

    const indexOfDate = fromFormat.indexOf(toFormat[i]);

    result.push(curDate[indexOfDate]);
  }

  return result.join(separator2);
}

module.exports = formatDate;
