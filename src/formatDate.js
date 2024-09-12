'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator1 = fromFormat[3];
  const separator2 = toFormat[3];
  const dateArray = date.split(separator1);
  const day = dateArray[fromFormat.indexOf('DD')];
  const month = dateArray[fromFormat.indexOf('MM')];
  let year = '';
  const newDate = [];

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
      newDate[i] = day;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = month;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      newDate[i] = year;
    }
  }

  return newDate.join(separator2);
}

module.exports = formatDate;
