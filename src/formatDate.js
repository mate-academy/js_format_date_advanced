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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const dateParts = date.split(oldSeparator);
  let newDate = '';
  const newDateParts = [];
  let yearFormatShort;
  let yearFormatLong;

  switch (true) {
    case toFormat.includes('YYYY') && fromFormat.includes('YY'):
      yearFormatShort = dateParts[fromFormat.indexOf('YY')];

      if (yearFormatShort > 29) {
        yearFormatLong = '19' + yearFormatShort;
      } else {
        yearFormatLong = '20' + yearFormatShort;
      }

      dateParts[dateParts.indexOf(yearFormatShort)] = yearFormatLong;
      fromFormat[fromFormat.indexOf('YY')] = 'YYYY';
      break;

    case toFormat.includes('YY') && fromFormat.includes('YYYY'):
      yearFormatLong = dateParts[fromFormat.indexOf('YYYY')];
      yearFormatShort = yearFormatLong.slice(2);

      fromFormat[fromFormat.indexOf('YYYY')] = 'YY';
      dateParts[dateParts.indexOf(yearFormatLong)] = yearFormatShort;
  }

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    const currentPart = fromFormat[i];
    const newIndex = toFormat.indexOf(currentPart);

    newDateParts[newIndex] = dateParts[i];
  }

  newDate = newDateParts.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
