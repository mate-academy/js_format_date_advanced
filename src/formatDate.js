'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_FORMAT_LONG = 'YYYY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const THIS_CENTURY = 20;
  const PREV_CENTURY = 19;
  const MAX_YEAR_FOR_THIS_CENTURY = 30;

  const resultDate = [];
  const resultSeparator = toFormat[3];

  const dateParts = date.split(fromFormat[3]);
  const year
    = dateParts[fromFormat.indexOf(YEAR_FORMAT_SHORT)]
    || dateParts[fromFormat.indexOf(YEAR_FORMAT_LONG)];
  const month = dateParts[fromFormat.indexOf(MONTH_FORMAT)];
  const day = dateParts[fromFormat.indexOf(DAY_FORMAT)];

  for (let i = 0; i < (toFormat.length - 1); i++) {
    switch (toFormat[i]) {
      case DAY_FORMAT:
        resultDate[i] = day;
        break;

      case MONTH_FORMAT:
        resultDate[i] = month;
        break;

      case YEAR_FORMAT_LONG:
        if (year.length === YEAR_FORMAT_LONG.length) {
          resultDate[i] = year;
        } else {
          resultDate[i] = year < MAX_YEAR_FOR_THIS_CENTURY
            ? THIS_CENTURY + year
            : PREV_CENTURY + year;
        }
        break;

      case YEAR_FORMAT_SHORT:
        if (year.length === YEAR_FORMAT_SHORT.length) {
          resultDate[i] = year;
        } else {
          resultDate[i] = year.slice(-2);
        }
        break;

      default:
        break;
    }
  }

  return resultDate.join(resultSeparator);
}

module.exports = formatDate;
