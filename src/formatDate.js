'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];

  result[toFormat.indexOf('DD')] = dateArr[fromFormat.indexOf('DD')];
  result[toFormat.indexOf('MM')] = dateArr[fromFormat.indexOf('MM')];

  if (toFormat.indexOf('YY') !== -1) {
    if (fromFormat.indexOf('YYYY') !== -1) {
      result[toFormat.indexOf('YY')] =
        dateArr[fromFormat.indexOf('YYYY')].slice(2);
    } else {
      result[toFormat.indexOf('YY')] = dateArr[fromFormat.indexOf('YY')];
    }
  } else {
    if (dateArr[fromFormat.indexOf('YY')] >= 30) {
      result[toFormat.indexOf('YYYY')] =
        '19' + dateArr[fromFormat.indexOf('YY')];
    } else if (dateArr[fromFormat.indexOf('YY')] < 30) {
      result[toFormat.indexOf('YYYY')] =
        '20' + dateArr[fromFormat.indexOf('YY')];
    } else {
      result[toFormat.indexOf('YYYY')] = dateArr[fromFormat.indexOf('YYYY')];
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
