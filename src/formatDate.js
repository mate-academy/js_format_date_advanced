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
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const day = oldDate[fromFormat.indexOf('DD')];
  const month = oldDate[fromFormat.indexOf('MM')];
  let year = '';

  if (fromFormat.includes('YY')) {
    year = oldDate[fromFormat.indexOf('YY')];
  }

  if (fromFormat.includes('YYYY')) {
    year = oldDate[fromFormat.indexOf('YYYY')];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(day);
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'YY':
        if (year.length === 4) {
          year = year.slice(2);
        }

        newDate.push(year);
        break;

      case 'YYYY':
        if (year.length === 2) {
          year = (+year < 30) ? (20 + year) : (19 + year);
        }

        newDate.push(year);
        break;

      default:
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
