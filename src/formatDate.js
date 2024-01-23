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

const INDEX_OF_SIGN = 3;
const YEAR = 'Y';
const MONTH = 'M';
const DAY = 'D';
const FIRST = 1;
const THIRD = 2;
const LONG_YEAR_FORMAT = 4;
const SHORT_YEAR_FORMAT = 2;
const TWENTIETH_CENTURY = '19';
const TWENTY_FIRST_CENTURY = '20';

function formatDate(date, fromFormat, toFormat) {
  const splitSign = fromFormat[INDEX_OF_SIGN];

  const joinSign = toFormat[INDEX_OF_SIGN];

  const dateData = date.split(splitSign);

  const resultArray = { ...dateData };

  const indexOfYearFromFormat = findIndexOfData(fromFormat, YEAR);
  const indexOfMonthFromFormat = findIndexOfData(fromFormat, MONTH);
  const indexOfDayFromFormat = findIndexOfData(fromFormat, DAY);

  const indexOfYearToFormat = findIndexOfData(toFormat, YEAR);
  const indexOfMonthToFormat = findIndexOfData(toFormat, MONTH);
  const indexOfDayToFormat = findIndexOfData(toFormat, DAY);

  resultArray[indexOfYearToFormat] = convertYear(
    dateData[indexOfYearFromFormat], fromFormat, toFormat
  );
  resultArray[indexOfMonthToFormat] = dateData[indexOfMonthFromFormat];
  resultArray[indexOfDayToFormat] = dateData[indexOfDayFromFormat];

  return Object.values(resultArray).join(joinSign);
}

function findIndexOfData(format, type) {
  for (let i = 0; i < INDEX_OF_SIGN; i++) {
    if (format[i][FIRST] === type) {
      return i;
    }
  }
}

function convertYear(year, fromFormat, toFormat) {
  const fromLength = findLength(fromFormat);
  const toLength = findLength(toFormat);

  if (fromLength === LONG_YEAR_FORMAT && toLength === SHORT_YEAR_FORMAT) {
    return year.slice(THIRD);
  } else if (fromLength === SHORT_YEAR_FORMAT
    && toLength === LONG_YEAR_FORMAT) {
    return (Number(year) < 30) ? TWENTY_FIRST_CENTURY.concat(year)
      : TWENTIETH_CENTURY.concat(year);
  } else {
    return year;
  }
}

function findLength(format) {
  const index = findIndexOfData(format, YEAR);

  return format[index].length;
}

module.exports = formatDate;
