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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const splittedDate = date.split(oldSeparator);

  const formattedDate = [];

  const oldFormatDate = {};
  const newFormatDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldFormatDate[fromFormat[i]] = splittedDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormatDate[toFormat[i]] = oldFormatDate[toFormat[i]];

    if (toFormat[i] === 'YYYY' && oldFormatDate['YY']) {
      if (+oldFormatDate['YY'] < 30) {
        newFormatDate[toFormat[i]] = `20${oldFormatDate['YY']}`;
      } else {
        newFormatDate[toFormat[i]] = `19${oldFormatDate['YY']}`;
      }
    }

    if (toFormat[i] === 'YY' && oldFormatDate['YYYY']) {
      newFormatDate[toFormat[i]] = oldFormatDate['YYYY'].slice(-2);
    }
  }

  for (const value of Object.values(newFormatDate)) {
    formattedDate.push(value);
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
