'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const initDivider = fromFormat[3];
  const finDivider = toFormat[3];
  const dateToArray = date.split(initDivider);
  let year = '';
  let day = '';
  let month = '';

  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].startsWith('YY')) {
      year = dateToArray[i];
    }

    if (fromFormat[i].startsWith('DD')) {
      day = dateToArray[i];
    }

    if (fromFormat[i].startsWith('MM')) {
      month = dateToArray[i];
    }
  }

  for (let j = 0; j <= toFormat.length - 2; j++) {
    if (toFormat[j].startsWith('YY')) {
      if (year.length > toFormat[j].length) {
        result[j] = year.slice(2);
      } else if (year.length < toFormat[j].length) {
        if (+year < 30) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
        result[j] = year;
      } else {
        result[j] = year;
      }
    }

    if (toFormat[j].startsWith('DD')) {
      result[j] = day;
    }

    if (toFormat[j].startsWith('MM')) {
      result[j] = month;
    }
  }

  return result.join(finDivider);
}

module.exports = formatDate;
