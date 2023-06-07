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
  const delim = fromFormat.pop();
  const glue = toFormat.pop();

  const previousDatePosition = fromFormat.indexOf('DD');
  const nextDatePosition = toFormat.indexOf('DD');
  const previousMonthPosition = fromFormat.indexOf('MM');
  const nextMonthPosition = toFormat.indexOf('MM');
  const previousYearPosition = 3 - previousDatePosition
    - previousMonthPosition;
  const nextYearPosition = 3 - nextDatePosition - nextMonthPosition;

  const periodNumbers = date.split(delim);

  const dateNumber = periodNumbers[previousDatePosition];
  const monthNumber = periodNumbers[previousMonthPosition];
  let yearNumber = periodNumbers[previousYearPosition];

  switch (toFormat[nextYearPosition].length) {
    case 2:
      yearNumber = yearNumber.slice(-2);
      break;

    case 4:
      if (fromFormat[previousYearPosition].length === 2) {
        if (yearNumber < 30) {
          yearNumber = '20' + yearNumber;
          break;
        }

        yearNumber = '19' + yearNumber;
      }
  }

  return (
    periodNumbers.fill(dateNumber, nextDatePosition, nextDatePosition + 1)
      .fill(monthNumber, nextMonthPosition, nextMonthPosition + 1)
      .fill(yearNumber, nextYearPosition, nextYearPosition + 1).join(glue)
  );
}

module.exports = formatDate;
