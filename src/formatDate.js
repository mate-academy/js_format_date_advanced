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

  const dateComponents = date.split(fromFormat[3]);
  const result = [];

  result[toFormat.indexOf('DD')] = dateComponents[fromFormat.indexOf('DD')];
  result[toFormat.indexOf('MM')] = dateComponents[fromFormat.indexOf('MM')];

  let year = (fromFormat.includes('YYYY'))
    ? dateComponents[fromFormat.indexOf('YYYY')]
    : dateComponents[fromFormat.indexOf('YY')];

  if (!toFormat.includes('YYYY')) {
    year = (year.length > 2) ? year.slice(2, 4) : year;
    result[toFormat.indexOf('YY')] = year;
  } else {
    year = (year.length === 2) ? (year < 30) ? `20${year}` : `19${year}` : year;
    result[toFormat.indexOf('YYYY')] = year;
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
