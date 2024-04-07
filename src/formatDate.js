'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3]);
  const fromDate = {};
  const resultArr = [];

  fromDate[fromFormat[0]] = arrDate[0];
  fromDate[fromFormat[1]] = arrDate[1];
  fromDate[fromFormat[2]] = arrDate[2];

  if (fromDate['YYYY'] > 0) {
    fromDate['YY'] = fromDate['YYYY'].slice(2);
  }

  if (fromDate['YY'] < 30) {
    fromDate['YYYY'] = `20${fromDate['YY']}`;
  } else {
    fromDate['YYYY'] = `19${fromDate['YY']}`;
  }

  resultArr.push(
    fromDate[toFormat[0]],
    fromDate[toFormat[1]],
    fromDate[toFormat[2]],
  );

  return resultArr.join(toFormat[3]);
}

module.exports = formatDate;
