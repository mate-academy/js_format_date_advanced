'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const objValueOfDate = {};
  const arrDateData = date.split(fromFormat[3]);
  const formattedDateParts = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objValueOfDate[fromFormat[i]] = arrDateData[i];
  }

  if (toFormat.includes('YYYY') && !('YYYY' in objValueOfDate)) {
    objValueOfDate['YYYY'] = objValueOfDate['YY'] < 30
      ? 2000 + +objValueOfDate['YY']
      : 1900 + +objValueOfDate['YY'];
    delete objValueOfDate['YY'];
  } else if (toFormat.includes('YY') && !('YY' in objValueOfDate)) {
    objValueOfDate['YY'] = +objValueOfDate['YYYY'] % 100;
    delete objValueOfDate['YYYY'];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedDateParts.push(objValueOfDate[toFormat[i]]);
  }

  return formattedDateParts.join(toFormat[3]);
}

module.exports = formatDate;
