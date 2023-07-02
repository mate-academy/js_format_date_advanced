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
  const newSeparator = toFormat[toFormat.length - 1];
  const oldSeparator = fromFormat[fromFormat.length - 1];

  const workDate = date.split(oldSeparator);
  let year = parseInt(workDate[fromFormat.indexOf('YYYY')], 10);

  if (fromFormat.includes('YY')) {
    const altYear = parseInt(workDate[fromFormat.indexOf('YY')], 10);

    year = altYear < 30 ? 2000 + altYear : 1900 + altYear;
  }

  const month = parseInt(workDate[fromFormat.indexOf('MM')], 10) - 1;
  const day = parseInt(workDate[fromFormat.indexOf('DD')], 10);

  const yearYY = year.toString().slice(-2);

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const formatToken = toFormat[i];

    switch (formatToken) {
      case 'YYYY':
        newDate.push(year);
        break;
      case 'YY':
        newDate.push(yearYY);
        break;
      case 'MM':
        newDate.push((month + 1).toString().padStart(2, '0'));
        break;
      case 'DD':
        newDate.push(day.toString().padStart(2, '0'));
        break;
    }
  }

  const result = newDate.join(newSeparator);

  return result;
}

module.exports = formatDate;
