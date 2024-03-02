'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;
  const DAYS_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const TWENTY = '20';
  const NINETEEN = '19';
  const SHORT_YEAR_FORMAT = 'YY';
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT_LENGTH = 2;
  const LONG_YEAR_FORMAT_LENGTH = 4;
  const partsOfDate = date.split(fromFormat[SEPARATOR_INDEX]);
  const resultArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === SHORT_YEAR_FORMAT || toFormat[i] === LONG_YEAR_FORMAT) {
      const indexOfYear =
        fromFormat.indexOf(SHORT_YEAR_FORMAT) !== -1
          ? fromFormat.indexOf(SHORT_YEAR_FORMAT)
          : fromFormat.indexOf(LONG_YEAR_FORMAT);
      const yearFromDate = partsOfDate[indexOfYear];

      if (
        toFormat[i].length === SHORT_YEAR_FORMAT_LENGTH &&
        yearFromDate.length === LONG_YEAR_FORMAT_LENGTH
      ) {
        resultArray[i] = yearFromDate.slice(SHORT_YEAR_FORMAT_LENGTH);
        continue;
      }

      if (
        toFormat[i].length === LONG_YEAR_FORMAT_LENGTH &&
        yearFromDate.length === SHORT_YEAR_FORMAT_LENGTH
      ) {
        if (+yearFromDate < 30) {
          resultArray[i] = TWENTY + yearFromDate;
        } else {
          resultArray[i] = NINETEEN + yearFromDate;
        }
        continue;
      }

      resultArray[i] = yearFromDate;
    }

    if (toFormat[i] === MONTH_FORMAT) {
      const indexOfMonth = fromFormat.indexOf(MONTH_FORMAT);
      const monthFromDate = partsOfDate[indexOfMonth];

      resultArray[i] = monthFromDate;
    }

    if (toFormat[i] === DAYS_FORMAT) {
      const indexOfDays = fromFormat.indexOf(DAYS_FORMAT);
      const daysFromDate = partsOfDate[indexOfDays];

      resultArray[i] = daysFromDate;
    }
  }

  return resultArray.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
