/* eslint-disable no-unused-vars */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(fromFormat[3]);
  const result = [];
  let year;
  const day = newDate[fromFormat.indexOf('DD')];
  const month = newDate[fromFormat.indexOf('MM')];

  if (fromFormat.includes('YYYY')) {
    year = newDate[fromFormat.indexOf('YYYY')];
  } else {
    year = newDate[fromFormat.indexOf('YY')];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(2);
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      result.push(day);
    }

    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      result.push(year);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
