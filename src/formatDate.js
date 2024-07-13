'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_FROM_FORMAT = fromFormat[3];
  const SEPARATOR_TO_FORMAT = toFormat[3];

  const SHORT_YEAR_FORMAT = 'YY';
  const LONG_YEAR_FORMAT = 'YYYY';

  const MAX_YEAR_NEW_CENTURY = 30;
  const NEW_CENTURY = 20;

  const dateArr = date.split(SEPARATOR_FROM_FORMAT);
  const formatedDateArr = [];

  const dateLength = dateArr.length;

  for (let i = 0; i < dateLength; i++) {
    for (let j = 0; j < dateLength; j++) {
      if (toFormat[i] === fromFormat[j]) {
        formatedDateArr.push(dateArr[j]);
        break;
      }

      if (
        toFormat[i] === SHORT_YEAR_FORMAT &&
        fromFormat[j] === LONG_YEAR_FORMAT
      ) {
        formatedDateArr.push(dateArr[j].slice(2));
      }

      if (
        toFormat[i] === LONG_YEAR_FORMAT &&
        fromFormat[j] === SHORT_YEAR_FORMAT
      ) {
        if (dateArr[j] < MAX_YEAR_NEW_CENTURY) {
          formatedDateArr.push(NEW_CENTURY.toString().concat(dateArr[j]));
          break;
        }

        formatedDateArr.push((NEW_CENTURY - 1).toString().concat(dateArr[j]));
      }
    }
  }

  return formatedDateArr.join(SEPARATOR_TO_FORMAT);
}

module.exports = formatDate;
