'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const PREV_CENTURY = '19';
  const NEXT_CENTURY = '20';
  const MIN_YEAR_FOR_PREV_CENTURY = 30;

  const YEAR_LONG = 'YYYY';
  const YEAR_SHORT = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  const DATE_ATTRIBUTES_LENGTH = 3;
  const DATE_FROM_SEPARATOR = fromFormat[3];
  const DATE_TO_SEPARATOR = toFormat[3];

  const previousDateArr = date.split(DATE_FROM_SEPARATOR);
  const newDateArr = [];

  for (let i = 0; i < DATE_ATTRIBUTES_LENGTH; i++) {
    for (let j = 0; j < DATE_ATTRIBUTES_LENGTH; j++) {
      if (fromFormat[i].slice(0, 2) === toFormat[j].slice(0, 2)) {
        switch (toFormat[j]) {
          case YEAR_LONG:
            if (fromFormat[i] === YEAR_LONG) {
              newDateArr[j] = previousDateArr[i];
              break;
            }

            if (parseInt(previousDateArr[i]) < MIN_YEAR_FOR_PREV_CENTURY) {
              newDateArr[j] = NEXT_CENTURY + previousDateArr[i];
              break;
            }

            newDateArr[j] = PREV_CENTURY + previousDateArr[i];
            break;

          case YEAR_SHORT:
            if (fromFormat[i] === YEAR_SHORT) {
              newDateArr[j] = previousDateArr[i];
              break;
            }

            newDateArr[j] = previousDateArr[i].slice(2);
            break;

          case MONTH:
            newDateArr[j] = previousDateArr[i];
            break;

          case DAY:
            newDateArr[j] = previousDateArr[i];
            break;

          default:
            break;
        }

        break;
      }
    }
  }

  return newDateArr.join(DATE_TO_SEPARATOR);
}

module.exports = formatDate;
