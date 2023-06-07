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
  const DELIM = fromFormat.pop();
  const GLUE = toFormat.pop();

  const PREVIOUS_DATE_POSITION = fromFormat.indexOf('DD');
  const NEXT_DATE_POSITION = toFormat.indexOf('DD');
  const PREVIOUS_MONTH_POSITION = fromFormat.indexOf('MM');
  const NEXT_MONTH_POSITION = toFormat.indexOf('MM');
  const PREVIOUS_YEAR_POSITION = 3 - PREVIOUS_DATE_POSITION
    - PREVIOUS_MONTH_POSITION;
  const NEXT_YEAR_POSITION = 3 - NEXT_DATE_POSITION - NEXT_MONTH_POSITION;

  const PERIOD_NUMBERS = date.split(DELIM);

  const DATE_NUMBER = PERIOD_NUMBERS[PREVIOUS_DATE_POSITION];
  const MONTH_NUMBER = PERIOD_NUMBERS[PREVIOUS_MONTH_POSITION];
  let yearNumber = PERIOD_NUMBERS[PREVIOUS_YEAR_POSITION];

  switch (toFormat[NEXT_YEAR_POSITION].length) {
    case 2:
      yearNumber = yearNumber.slice(-2);
      break;

    case 4:
      if (fromFormat[PREVIOUS_YEAR_POSITION].length === 2) {
        if (yearNumber < 30) {
          yearNumber = '20' + yearNumber;
          break;
        }

        yearNumber = '19' + yearNumber;
      }
  }

  return (
    PERIOD_NUMBERS.fill(DATE_NUMBER, NEXT_DATE_POSITION, NEXT_DATE_POSITION + 1)
      .fill(MONTH_NUMBER, NEXT_MONTH_POSITION, NEXT_MONTH_POSITION + 1)
      .fill(yearNumber, NEXT_YEAR_POSITION, NEXT_YEAR_POSITION + 1).join(GLUE)
  );
}

module.exports = formatDate;
