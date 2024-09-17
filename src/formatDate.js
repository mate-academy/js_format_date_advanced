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
  const dateArr = date.split(fromFormat[3]);
  const res = [];

  const day = dateArr[fromFormat.indexOf('DD')];
  const month = dateArr[fromFormat.indexOf('MM')];
  let year;

  if (fromFormat.includes('YYYY')) {
    year = dateArr[fromFormat.indexOf('YYYY')];
  } else {
    year = dateArr[fromFormat.indexOf('YY')];
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
      res.push(day);
    }

    if (fromFormat[i] === 'MM') {
      res.push(month);
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      res.push(year);
    }
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
