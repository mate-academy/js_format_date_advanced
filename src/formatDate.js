'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const splitted = date.split(fromSeparator);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const formatPart = fromFormat[i];
    const value = splitted[i];

    if (formatPart === 'YY') {
      const num = parseInt(value, 10);

      if (num < 30) {
        dateObj['YYYY'] = '20' + value;
      } else {
        dateObj['YYYY'] = '19' + value;
      }
    } else {
      dateObj[formatPart] = value;
    }
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (key === 'YY') {
      resultParts.push(dateObj['YYYY'].slice(2));
    } else {
      resultParts.push(dateObj[key]);
    }
  }

  const toSeparator = toFormat[toFormat.length - 1];
  const result = resultParts.join(toSeparator);

  return result;
}

module.exports = formatDate;
