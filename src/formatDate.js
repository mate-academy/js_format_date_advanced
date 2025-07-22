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

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const values = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromParts[i]] = values[i];
  }

  const resultParts = toParts.map((part) => {
    if (part === 'YYYY') {
      if (dateMap['YYYY']) {
        return dateMap['YYYY'];
      }

      if (dateMap['YY']) {
        const yearNum = parseInt(dateMap['YY'], 10);

        if (yearNum < 30) {
          return '20' + dateMap['YY'];
        } else {
          return '19' + dateMap['YY'];
        }
      }
    }

    if (part === 'YY') {
      if (dateMap['YY']) {
        return dateMap['YY'];
      }

      if (dateMap['YYYY']) {
        return dateMap['YYYY'].slice(-2);
      }
    }

    return dateMap[part];
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
