'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_LONG_FORMAT = 'YYYY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const CENTURY_21 = '20';
  const CENTURY_20 = '19';
  const MAX_YEAR = 30;
  const DELIMITER = fromFormat.pop();
  const SEPARATOR = toFormat.pop();
  const dateParts = date.split(DELIMITER);
  const shortYearIndex = fromFormat.indexOf(YEAR_SHORT_FORMAT);
  const longYearIndex = fromFormat.indexOf(YEAR_LONG_FORMAT);
  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    let index;
    let year;

    switch (toFormat[i]) {
      case YEAR_SHORT_FORMAT:
        index = shortYearIndex < 0 ? longYearIndex : shortYearIndex;
        year = dateParts[index];

        if (year.length === 4) {
          formattedDateParts.push(year.slice(-2));
        } else {
          formattedDateParts.push(year);
        }
        break;

      case MONTH_FORMAT:
        index = fromFormat.indexOf(MONTH_FORMAT);
        formattedDateParts.push(dateParts[index]);
        break;

      case DAY_FORMAT:
        index = fromFormat.indexOf(DAY_FORMAT);
        formattedDateParts.push(dateParts[index]);
        break;

      case YEAR_LONG_FORMAT:
        index = longYearIndex < 0 ? shortYearIndex : longYearIndex;
        year = dateParts[index];

        if (year.length === 2) {
          const century = year < MAX_YEAR ? CENTURY_21 : CENTURY_20;

          formattedDateParts.push(century + year);
        } else {
          formattedDateParts.push(year);
        }
        break;

      default:
        break;
    }
  }

  return formattedDateParts.join(SEPARATOR);
}

module.exports = formatDate;
