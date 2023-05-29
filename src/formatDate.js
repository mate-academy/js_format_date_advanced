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
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const formattedDateParts = [];
  const joinElement = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const format = toFormat[i];
    const formatIndex = fromFormat.indexOf(format);

    if (formatIndex !== -1) {
      formattedDateParts.push(dateParts[formatIndex]);
    } else if (format === 'YY') {
      const year = parseInt(dateParts[fromFormat.indexOf('YYYY')], 10) % 100;

      formattedDateParts.push(year.toString().padStart(2, '0'));
    } else if (format === 'YYYY' && dateParts[fromFormat.indexOf('YY')] >= 30) {
      formattedDateParts.push('19' + dateParts[fromFormat.indexOf('YY')]);
    } else if (format === 'YYYY') {
      formattedDateParts.push('20' + dateParts[fromFormat.indexOf('YY')]);
    } else {
      formattedDateParts.push(format);
    }
  }

  return formattedDateParts.join(joinElement);
}

module.exports = formatDate;
