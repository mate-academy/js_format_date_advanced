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
  const DATE_SPLIT = date.split(fromFormat[fromFormat.length - 1]);
  const NEW_FORMAT = [];
  const object = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('D')) {
      object.day = DATE_SPLIT[i];
    }

    if (fromFormat[i].includes('M')) {
      object.month = DATE_SPLIT[i];
    }

    if (fromFormat[i].includes('Y')) {
      object.year = DATE_SPLIT[i];
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      NEW_FORMAT[i] = object.day;
    }

    if (toFormat[i].includes('M')) {
      NEW_FORMAT[i] = object.month;
    }

    if (toFormat[i] === 'YY') {
      NEW_FORMAT[i] = object.year.slice(2);
    }

    if (toFormat[i] === 'YYYY') {
      if (object.year.length < 4) {
        object.year = (+object.year < 30 ? '20' : '19') + object.year;
      }

      NEW_FORMAT[i] = object.year;
    }
  }

  return NEW_FORMAT.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
