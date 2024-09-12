'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateSeparated = date.split(`${oldSeparator}`);

  const oldFormat = {};
  const newFormat = {};

  const newDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormat[toFormat[i]] = '';
  }

  for (let i = 0; i < dateSeparated.length; i++) {
    oldFormat[fromFormat[i]] = dateSeparated[i];
  }

  for (const key in oldFormat) {
    for (let i = 0; i < toFormat.length; i++) {
      if (key.includes(toFormat[i][0])) {
        newFormat[toFormat[i]] = oldFormat[key];
      }
    }
  }

  for (const key in newFormat) {
    if (key === 'YY') {
      newFormat['YY'] = newFormat['YY'][2] + newFormat['YY'][3];
    }

    if (key === 'YYYY' && newFormat[key] < 30) {
      newFormat[key] = '20' + newFormat[key];
    }

    if (key === 'YYYY' && newFormat[key].length < 4) {
      newFormat[key] = '19' + newFormat[key];
    }
  }

  for (const key in newFormat) {
    newDateArr.push(newFormat[key]);
  }

  return newDateArr.join(`${newSeparator}`);
}

module.exports = formatDate;
