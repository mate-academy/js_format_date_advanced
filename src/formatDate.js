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
  const TYPE_OF_YEAR_LONG = 'YYYY';
  const TYPE_OF_YEAR_SHORT = 'YY';
  const TYPE_OF_MONTH = 'MM';
  const TYPE_OF_DAY = 'DD';
  const CENTURE_21 = 20;
  const CENTURE_20 = 19;
  const LIMIT_YEAR = 30;

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const separatedDate = date.split(oldSeparator);
  const newFormatDateArr = [];

  function getIndex(arr, type) {
    return arr.indexOf(type);
  }

  function findIndex(arr, type1, type2) {
    return arr.findIndex(item => item.includes(type1) || item.includes(type2));
  }

  const indexOfDayOld = getIndex(fromFormat, TYPE_OF_DAY);
  const indexOfMonthOld = getIndex(fromFormat, TYPE_OF_MONTH);
  const indexOfYearOld = findIndex(
    fromFormat, TYPE_OF_YEAR_LONG, TYPE_OF_YEAR_SHORT
  );

  const indexOfDayNew = getIndex(toFormat, TYPE_OF_DAY);
  const indexOfMonthNew = getIndex(toFormat, TYPE_OF_MONTH);
  const indexOfYearNew = findIndex(
    toFormat, TYPE_OF_YEAR_LONG, TYPE_OF_YEAR_SHORT
  );

  newFormatDateArr[indexOfYearNew] = separatedDate[indexOfYearOld];
  newFormatDateArr[indexOfMonthNew] = separatedDate[indexOfMonthOld];
  newFormatDateArr[indexOfDayNew] = separatedDate[indexOfDayOld];

  const isShortYear = toFormat[indexOfYearNew].includes(TYPE_OF_YEAR_SHORT);
  const shortYear = newFormatDateArr[indexOfYearNew].slice(-2);

  if (isShortYear) {
    newFormatDateArr[indexOfYearNew] = shortYear;
  }

  const isLongYear = toFormat[indexOfYearNew].includes(TYPE_OF_YEAR_LONG);

  if (isLongYear) {
    newFormatDateArr[indexOfYearNew] = shortYear;

    if (shortYear < LIMIT_YEAR) {
      newFormatDateArr[indexOfYearNew] = CENTURE_21 + shortYear;
    } else {
      newFormatDateArr[indexOfYearNew] = CENTURE_20 + shortYear;
    }
  }

  return newFormatDateArr.join(newSeparator);
}

module.exports = formatDate;
