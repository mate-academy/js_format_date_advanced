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
  const toSeparator = toFormat[toFormat.length - 1];
  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const dateParts = date.split(fromSeparator);

  const dateObj = {};

  fromParts.forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  const formattedDate = toParts
    .map((part) => {
      if (part === 'YYYY' && dateObj['YY']) {
        const year = parseInt(dateObj['YY'], 10);

        if (year < 30) {
          return '20' + dateObj['YY'];
        } else {
          return '19' + dateObj['YY'];
        }
      } else if (part === 'YY' && dateObj['YYYY']) {
        return dateObj['YYYY'].slice(-2);
      } else {
        return dateObj[part];
      }
    })
    .join(toSeparator);

  return formattedDate;
}

module.exports = formatDate;
