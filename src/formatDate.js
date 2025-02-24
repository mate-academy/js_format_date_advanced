'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);

  const day = dateArr[fromFormat.indexOf('DD')];
  const month = dateArr[fromFormat.indexOf('MM')];
  let year =
    dateArr[fromFormat.indexOf('YYYY')] || dateArr[fromFormat.indexOf('YY')];

  const result = [];

  result[toFormat.indexOf('DD')] = day;
  result[toFormat.indexOf('MM')] = month;

  if (toFormat.includes('YY')) {
    result[toFormat.indexOf('YY')] = year.slice(-2);
  } else {
    if (year.length === 2) {
      year = Number(year) < 30 ? '20' + year : '19' + year;
    }
    result[toFormat.indexOf('YYYY')] = year;
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
