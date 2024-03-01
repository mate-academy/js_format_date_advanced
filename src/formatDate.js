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
const DAY = 'DD';
const MONTH = 'MM';
const YEAR_FULL = 'YYYY';
const YEAR_SHORT = 'YY';
const TO_TWENTIETH_CENTURY = '19';
const TO_TWENTY_FIRST_CENTURY = '20';

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateArray = date.split(`${separatorFrom}`);
  const correctDateArray = [];
  const day = dateArray[fromFormat.indexOf(DAY)];
  const month = dateArray[fromFormat.indexOf(MONTH)];

  let yearFull = fromFormat.indexOf(YEAR_FULL) !== -1
    ? dateArray[fromFormat.indexOf(YEAR_FULL)]
    : '';
  let yearShort = fromFormat.indexOf(YEAR_SHORT) !== -1
    ? dateArray[fromFormat.indexOf(YEAR_SHORT)]
    : '';

  if (yearFull) {
    yearShort = yearFull.slice(2);
  } else {
    yearFull = +yearShort < 30
      ? TO_TWENTY_FIRST_CENTURY + yearShort
      : TO_TWENTIETH_CENTURY + yearShort;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case DAY:
        correctDateArray.push(day);
        break;

      case MONTH:
        correctDateArray.push(month);
        break;

      case YEAR_FULL:
        correctDateArray.push(yearFull);
        break;

      case YEAR_SHORT:
        correctDateArray.push(yearShort);
        break;

      default:
        return 'mistake';
    }
  }

  return correctDateArray.join(separatorTo);
}

module.exports = formatDate;
