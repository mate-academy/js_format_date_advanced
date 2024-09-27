'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const result = [];

  const day = dateArray[fromFormat.indexOf('DD')];
  const month = dateArray[fromFormat.indexOf('MM')];
  let year;

  if (fromFormat.includes('YYYY')) {
    year = dateArray[fromFormat.indexOf('YYYY')];
  } else {
    year = dateArray[fromFormat.indexOf('YY')];
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

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      result.push(year);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
