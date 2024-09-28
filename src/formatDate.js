'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const str = date.split(fromFormat[3]);
  let year = str[fromFormat.indexOf('YYYY')] || str[fromFormat.indexOf('YY')];
  const res = [];

  res[toFormat.indexOf('DD')] = str[fromFormat.indexOf('DD')];
  res[toFormat.indexOf('MM')] = str[fromFormat.indexOf('MM')];

  if (toFormat.includes('YYYY')) {
    if (fromFormat.includes('YY')) {
      year = year < 30 ? '20' + year : '19' + year;
    }
    res[toFormat.indexOf('YYYY')] = year;
  }

  if (toFormat.includes('YY')) {
    if (fromFormat.includes('YYYY')) {
      year = year.slice(-2);
    }
    res[toFormat.indexOf('YY')] = year;
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
