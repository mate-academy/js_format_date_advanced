'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateParts = date.split(fromFormat[3]);

  const yearIndex = fromFormat.indexOf('YYYY') > -1
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  let year = dateParts[yearIndex];
  const month = dateParts[monthIndex];
  const day = dateParts[dayIndex];

  if (fromFormat[yearIndex] === 'YY' && toFormat.includes('YYYY')) {
    year = parseInt(year) < 30 ? '20' + year : '19' + year;
  } else if (fromFormat[yearIndex] === 'YYYY' && toFormat.includes('YY')) {
    year = year.substring(2);
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newDate += year;
    } else if (toFormat[i] === 'MM') {
      newDate += month;
    } else if (toFormat[i] === 'DD') {
      newDate += day;
    }

    if (i < toFormat.length - 2) {
      newDate += toFormat[3];
    }
  }

  return newDate;
}

module.exports = formatDate;
