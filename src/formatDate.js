'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArray = date.split(oldSeparator);

  const oldFormat = {};
  const newFormat = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldFormat[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (!oldFormat.hasOwnProperty(toFormat[i])
        && toFormat[i].length === 2) {
      newFormat[toFormat[i]] = oldFormat['YYYY'].slice(2, 4);

      continue;
    }

    if (!oldFormat.hasOwnProperty(toFormat[i])
    && toFormat[i].length === 4) {
      if (oldFormat['YY'] < 30) {
        newFormat[toFormat[i]] = '20' + oldFormat['YY'];
      } else {
        newFormat[toFormat[i]] = '19' + oldFormat['YY'];
      }

      continue;
    }

    newFormat[toFormat[i]] = oldFormat[toFormat[i]];
  }

  return Object.values(newFormat).join(newSeparator);
}

module.exports = formatDate;
