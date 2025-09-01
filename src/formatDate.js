'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  const resultParts = toFormat.slice(0, 3).map((part) => {
    if (part === 'YY') {
      if (dateObj['YYYY']) {
        return dateObj['YYYY'].slice(-2);
      } else {
        return dateObj['YY'];
      }
    } else if (part === 'YYYY') {
      if (dateObj['YY']) {
        const yy = parseInt(dateObj['YY'], 10);

        return yy < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
      } else {
        return dateObj['YYYY'];
      }
    } else {
      return dateObj[part];
    }
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
