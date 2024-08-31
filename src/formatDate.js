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
  const fromDelimeter = fromFormat[fromFormat.length - 1];
  const dateArr = date.split(fromDelimeter);
  const dataObj = {};

  for (let d = 0; d <= 2; d++) {
    dataObj[fromFormat[d]] = dateArr[d];
  }

  const properObj = {};
  const propFormat = toFormat.slice(0, -1);

  for (const d of propFormat) {
    if (d === 'YY' || d === 'YYYY') {
      properObj[d] = dataObj['YY'] || dataObj['YYYY'];
    } else {
      properObj[d] = dataObj[d];
    }
  }

  if (('' + properObj['YY']).length === 4) {
    properObj['YY'] = ('' + properObj['YY']).slice(2);
  }

  if (('' + properObj['YYYY']).length === 2) {
    if (properObj['YYYY'] < 30) {
      properObj['YYYY'] = '20' + properObj['YYYY'];
    } else if (properObj['YYYY'] >= 30) {
      properObj['YYYY'] = '19' + properObj['YYYY'];
    }
  }

  const resultArr = [];

  for (const value of Object.values(properObj)) {
    resultArr.push(value);
  }

  const result = resultArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
