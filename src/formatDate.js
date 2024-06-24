'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplit = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; toFormat.length - 1 > i; i++) {
    const format = toFormat[i];

    if (format === 'YYYY' && fromFormat.includes('YY')) {
      let year = dateSplit[fromFormat.indexOf('YY')];

      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
      newDate.push(year);
    } else if (format === 'YY') {
      newDate.push(dateSplit[fromFormat.indexOf('YYYY')].slice(-2));
    } else {
      newDate.push(dateSplit[fromFormat.indexOf(format)]);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
