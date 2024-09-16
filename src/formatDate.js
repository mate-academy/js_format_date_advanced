'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const outputDate = [];
  const parts = date.split(fromFormat[3]);
  const day = parts[fromFormat.indexOf('DD')];
  const month = parts[fromFormat.indexOf('MM')];
  const year = parts[fromFormat.indexOf('YY')]
  || parts[fromFormat.indexOf('YYYY')];

  for (const char of toFormat) {
    switch (char) {
      case 'DD':
        outputDate.push(day);
        break;
      case 'MM':
        outputDate.push(month);
        break;
      case 'YYYY':
        if (year.length === 2) {
          outputDate.push((year < 30 ? '20' : '19') + year);
        } else {
          outputDate.push(year);
        }
        break;
      case 'YY':
        outputDate.push(year.slice(2));
        break;
      default:
        break;
    }
  }

  return outputDate.join(toFormat[3]);
}

module.exports = formatDate;
