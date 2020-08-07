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

  const formattedDate = dateWithoutSeparator.split(' ');

  if (toFormat[2].length === 2) {
    for (let i = 0; i < formattedDate.length; i++) {
      if (formattedDate[i].length > toFormat[0].length) {
        formattedDate[i] = formattedDate[i].split('').splice(-2, 2).join('');
      }
    }
  }

  if (fromFormat[0] !== toFormat[0]) {
    [formattedDate[0], formattedDate[1]] = [formattedDate[1], formattedDate[0]];
  }

  if (fromFormat[0].includes('YY')) {
    return formattedDate.reverse().join(`${separator}`);
  }

  return formattedDate.join(`${separator}`);
}

module.exports = formatDate;
