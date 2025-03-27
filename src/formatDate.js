'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateArr = date.split(fromFormat[3]);
  const dateYear =
    dateArr[fromFormat.indexOf('YYYY')] || dateArr[fromFormat.indexOf('YY')];

  for (const format of toFormat) {
    switch (format) {
      case 'DD':
      case 'MM':
        newDate.push(dateArr[fromFormat.indexOf(format)]);
        break;

      case 'YYYY':
        if (fromFormat.includes('YY')) {
          newDate.push((parseInt(dateYear, 10) < 30 ? '20' : '19') + dateYear);
        } else {
          newDate.push(dateYear);
        }
        break;

      case 'YY':
        if (dateArr[fromFormat.indexOf('YYYY')]) {
          newDate.push(dateYear.slice(-2));
        } else {
          newDate.push(dateYear);
        }
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
