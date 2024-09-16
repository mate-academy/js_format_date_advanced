'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const object = Object.fromEntries(fromFormat.slice(0,
    -1).map(
    (format, index) => [format, dateArray[index]]
  ));
  const separator = toFormat[toFormat.length - 1];

  const result = toFormat.slice(0, -1).map(format => {
    if (format === 'YYYY' && !object.hasOwnProperty('YYYY')) {
      const year = object['YY'];

      return convertedYear(year);
    } else if (format === 'YY' && !object.hasOwnProperty('YY')) {
      const year = object['YYYY'];

      return convertedYear(year);
    } else {
      return object[format];
    }
  });

  return result.join(separator);
}

function convertedYear(year) {
  if (year.length === 4) {
    return year.slice(2);
  }

  return parseInt(year) >= 30 ? '19' + year : '20' + year;
}

module.exports = formatDate;
