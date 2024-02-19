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
  const gapPrevious = fromFormat[3];
  const gapPresent = toFormat[3];

  const DAY_FORMAT = 'DD';
  const MONTH_FORMAT = 'MM';
  const YEAR_LONG_FORMAT = 'YYYY';
  const YEAR_SHORT_FORMAT = 'YY';
  const LESS_THIRTY_YEAR = '20';
  const ABOVE_THIRTY_YEAR = '19';

  const datePrevForm = date.split(gapPrevious);
  const datePresForm = date.split(gapPrevious);

  datePresForm[toFormat.indexOf(DAY_FORMAT)] = datePrevForm[fromFormat.indexOf(DAY_FORMAT)];
  datePresForm[toFormat.indexOf(MONTH_FORMAT)] = datePrevForm[fromFormat.indexOf(MONTH_FORMAT)];

  const prevYearPos = fromFormat.includes(YEAR_LONG_FORMAT)
    ? fromFormat.indexOf(YEAR_LONG_FORMAT)
    : fromFormat.indexOf(YEAR_SHORT_FORMAT);
  const presYearPos = toFormat.includes(YEAR_LONG_FORMAT)
    ? toFormat.indexOf(YEAR_LONG_FORMAT)
    : toFormat.indexOf(YEAR_SHORT_FORMAT);

  if (fromFormat.includes(YEAR_LONG_FORMAT) && toFormat.includes(YEAR_LONG_FORMAT)) {
    datePresForm[presYearPos] = datePrevForm[prevYearPos];
  } else if (fromFormat.includes(YEAR_LONG_FORMAT) && toFormat.includes(YEAR_SHORT_FORMAT)) {
    datePresForm[prevYearPos] = datePrevForm[presYearPos].slice(-2);
  } else if (fromFormat.includes(YEAR_SHORT_FORMAT) && toFormat.includes(YEAR_LONG_FORMAT)) {
    if (datePresForm[prevYearPos] < 30) {
      datePresForm[prevYearPos] = LESS_THIRTY_YEAR + datePrevForm[presYearPos];
    } else {
      datePresForm[prevYearPos] = ABOVE_THIRTY_YEAR + datePrevForm[presYearPos];
    }
  }

  return datePresForm.join(gapPresent);
}

module.exports = formatDate;
