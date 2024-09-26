'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const dateValue = date.split(fromFormat[3]);
  const objectFromFormat = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objectFromFormat[fromFormat[i]] = dateValue[i];
  }

  if (!Object.keys(objectFromFormat).includes('YY')) {
    objectFromFormat['YY'] = objectFromFormat.YYYY.slice(2);
  }

  if (!Object.keys(objectFromFormat).includes('YYYY')) {
    if (objectFromFormat.YY < 30) {
      objectFromFormat['YYYY'] = 20 + objectFromFormat.YY;
    } else {
      objectFromFormat['YYYY'] = 19 + objectFromFormat.YY;
    }
  }

  for (const toForm of toFormat) {
    for (const key in objectFromFormat) {
      if (key === toForm) {
        result.push(objectFromFormat[key]);
      }
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
