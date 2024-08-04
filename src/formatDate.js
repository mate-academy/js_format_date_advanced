'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const oldVersion = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    oldVersion[fromFormat[i]] = dateParts[i];

    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      oldVersion['YY'] = oldVersion['YYYY'].slice(2);
    }

    if (fromFormat[i] === 'YY' && toFormat.includes('YYYY')) {
      if (oldVersion['YY'] < 30) {
        oldVersion['YYYY'] = `20${oldVersion['YY']}`;
      } else {
        oldVersion['YYYY'] = `19${oldVersion['YY']}`;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(oldVersion[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
