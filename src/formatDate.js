'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const oldDateObject = {};
  const result = [];

  for (let i = 0; i < 3; i++) {
    oldDateObject[fromFormat[i]] = oldDate[i];
  }

  if (oldDateObject['YY'] >= 30) {
    oldDateObject['YYYY'] = 19 + oldDateObject['YY'];
  } else if (oldDateObject['YY'] < 30) {
    oldDateObject['YYYY'] = 20 + oldDateObject['YY'];
  } else {
    oldDateObject['YY'] = oldDateObject['YYYY'].slice(2);
  }

  for (let i = 0; i < 3; i++) {
    result.push(oldDateObject[toFormat[i]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
