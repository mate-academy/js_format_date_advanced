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
  const separatorPrevious = fromFormat[3];
  const separatorNew = toFormat[3];
  const datePrevious = date.split(separatorPrevious);

  let yearPreviousFormat = '';
  let year = '';
  let day = '';
  let month = '';
  let newDateResult = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('YY') || fromFormat[i].includes('YYYY')) {
      year = datePrevious[i];
      yearPreviousFormat = fromFormat[i];
    }

    if (fromFormat[i].includes('DD')) {
      day = datePrevious[i];
    }

    if (fromFormat[i].includes('MM')) {
      month = datePrevious[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j].includes('YY') || toFormat[j].includes('YYYY')) {
      if (toFormat[j].length > yearPreviousFormat.length) {
        if (year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      }

      if (toFormat[j].length < yearPreviousFormat.length) {
        year = year.slice(2);
      }
      newDateResult += year;
    }

    if (toFormat[j].includes('D')) {
      newDateResult += day;
    }

    if (toFormat[j].includes('M')) {
      newDateResult += month;
    }

    if (j < toFormat.length - 2) {
      newDateResult += separatorNew;
    }
  }

  return newDateResult;
}

module.exports = formatDate;
