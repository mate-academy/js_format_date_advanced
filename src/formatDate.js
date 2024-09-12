'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const separator = date.split(fromFormat[3]);
  const day = separator[fromFormat.indexOf('DD')];
  const month = separator[fromFormat.indexOf('MM')];
  const year
    = separator[fromFormat.indexOf('YY')]
    || separator[fromFormat.indexOf('YYYY')];

  for (const char of toFormat) {
    switch (char) {
      case 'DD':
        result.push(day);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'YYYY':
        if (year.length === 2) {
          result.push((year < 30 ? '20' : '19') + year);
        } else {
          result.push(year);
        }
        break;

      case 'YY':
        result.push(year.slice(2));
        break;

      default:
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
