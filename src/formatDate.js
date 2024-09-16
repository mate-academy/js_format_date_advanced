'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]).slice(0, 3);
  const day = dateArr[fromFormat.indexOf('DD')];
  const month = dateArr[fromFormat.indexOf('MM')];
  const year = fromFormat.includes('YYYY')
    ? dateArr[fromFormat.indexOf('YYYY')].slice(-2)
    : dateArr[fromFormat.indexOf('YY')];
  const century = +year < 30
    ? '20'
    : '19';

  return toFormat.slice(0, 3).join(toFormat[3])
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', century + year)
    .replace('YY', year);
}

module.exports = formatDate;
