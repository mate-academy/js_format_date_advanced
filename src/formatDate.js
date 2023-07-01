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
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const oldDate = date.split(fromSeparator);
  const newDate = [];

  let year;
  let month;
  let day;

  for (const index in fromFormat) {
    const toFormatPart = fromFormat[index];
    const oldDatePart = oldDate[index];

    // get date values from old format
    if (toFormatPart.includes('YY')) {
      year = oldDatePart;
    }

    if (toFormatPart.includes('MM')) {
      month = oldDatePart;
    }

    if (toFormatPart.includes('DD')) {
      day = oldDatePart;
    }
  }

  // check for required format of year
  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = year < 30 ? `20${year}` : `19${year}`;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year < 30 ? year - 2000 : year - 1900;
  }

  // set date values into new format
  for (const toFormatPart of toFormat) {
    if (toFormatPart.includes('YY')) {
      newDate.push(year);
    }

    if (toFormatPart.includes('MM')) {
      newDate.push(month);
    }

    if (toFormatPart.includes('DD')) {
      newDate.push(day);
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;

module.exports = formatDate;
