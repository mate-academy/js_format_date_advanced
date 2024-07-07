'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateArr = date.split(fromSeparator);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const formatChar = toFormat[i];

    if (formatChar === 'YY' && dateObj['YYYY']) {
      result.push(dateObj['YYYY'].split('').slice(2).join(''));
    } else if (formatChar === 'YYYY' && dateObj['YY']) {
      const year = +dateObj['YY'];

      result.push(year < 30 ? `20${dateObj['YY']}` : `19${dateObj['YY']}`);
    } else {
      result.push(dateObj[formatChar]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
