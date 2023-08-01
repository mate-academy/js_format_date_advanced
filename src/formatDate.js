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
  let newFormatDate = '';

  const oldDateSeparator = fromFormat[3];
  const newDateSeparator = toFormat[3];
  const oldDate = date.split(oldDateSeparator);
  let oldYear;
  const month = oldDate[fromFormat.indexOf('MM')];
  const day = oldDate[fromFormat.indexOf('DD')];
  let newYear;
  const lastElementInNewDate = toFormat[2];
  const FOUR_DIGITS_YEAR = 'YYYY';
  const TWO_DIGITS_YEAR = 'YY';
  const TWENTY_CENTURY = 20;
  const NINETEENTH_CENTURY = 19;

  for (const format of fromFormat) {
    if (format[0] === 'Y') {
      oldYear = getOldYear(format, fromFormat, oldDate);

      if (format === FOUR_DIGITS_YEAR) {
        newYear = oldYear;

        if (toFormat.includes(TWO_DIGITS_YEAR)) {
          newYear = oldYear.slice(2);
        }
      }

      if (format === TWO_DIGITS_YEAR) {
        newYear = oldYear;

        if (toFormat.includes(FOUR_DIGITS_YEAR)) {
          if (+oldYear < 30) {
            newYear = `${TWENTY_CENTURY}${oldYear}`;
          } else {
            newYear = `${NINETEENTH_CENTURY}${oldYear}`;
          }
        }
      }

      break;
    }
  }

  for (const element of toFormat) {
    switch (element) {
      case 'YYYY':
        newFormatDate += newYear;
        break;

      case 'YY':
        newFormatDate += newYear;
        break;

      case 'MM':
        newFormatDate += month;
        break;

      case 'DD':
        newFormatDate += day;
        break;
    }

    if (element !== lastElementInNewDate && element !== newDateSeparator) {
      newFormatDate += newDateSeparator;
    }
  }

  return newFormatDate;
}

function getOldYear(yearFormat, fromFormat, oldDate) {
  return oldDate[fromFormat.indexOf(yearFormat)];
}

module.exports = formatDate;
