'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_SEPARATOR = fromFormat[fromFormat.length - 1];
  const TO_SEPARATOR = toFormat[toFormat.length - 1];

  const DAY = 'DD';
  const MONTH = 'MM';
  const SHORT_YEAR = 'YY';
  const FULL_YEAR = 'YYYY';

  let dayValue, monthValue, yearValue;

  const dateArray = date.split(FROM_SEPARATOR);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case DAY:
        dayValue = dateArray[i];
        break;
      case MONTH:
        monthValue = dateArray[i];
        break;
      case SHORT_YEAR:
      case FULL_YEAR:
        yearValue = dateArray[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case DAY:
        result.push(dayValue);
        break;
      case MONTH:
        result.push(monthValue);
        break;
      case SHORT_YEAR:
        result.push(yearValue.slice(-2));
        break;
      case FULL_YEAR:
        if (yearValue.length < 4) {
          if (+yearValue < 30) {
            yearValue = `20${yearValue}`;
          } else {
            yearValue = `19${yearValue}`;
          }
        }
        result.push(yearValue);
        break;
    }
  }

  return result.join(TO_SEPARATOR);
}

module.exports = formatDate;
