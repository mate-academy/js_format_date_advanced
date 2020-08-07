'use strict';

/**
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateWithoutSeparator = date.replace(/\D/g, ' ');

  const separator = toFormat[3];

  const testDate = dateWithoutSeparator.split(' ');

  if (toFormat[2].length === 2) {
    for (let i = 0; i < testDate.length; i++) {
      if (testDate[i].length > toFormat[0].length) {
        testDate[i] = testDate[i].split('').splice(-2, 2).join('');
      }
    }
  }

  if (fromFormat[0] !== toFormat[0]) {
    [testDate[0], testDate[1]] = [testDate[1], testDate[0]];
  }

  if (fromFormat[0].includes('YY')) {
    return testDate.reverse().join(`${separator}`);
  }

  return testDate.join(`${separator}`);
}

module.exports = formatDate;
