'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const dateObj = {
    [fromFormat[0]]: parts[0],
    [fromFormat[1]]: parts[1],
    [fromFormat[2]]: parts[2],
  };

  const result = toFormat.slice(0, 3).map((part) => {
    if (dateObj[part]) {
      return dateObj[part];
    } else if (part === 'YY') {
      return dateObj['YYYY'].slice(-2);
    } else if (part === 'YYYY') {
      const year = dateObj['YY'];

      return parseInt(year) < 30 ? '20' + year : '19' + year;
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
