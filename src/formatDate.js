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
  const currentSep = fromFormat[3];
  const finalSep = toFormat[3];
  const dateBefore = date.split(currentSep);
  const result = [];

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateBefore[i];
        break;

      case 'MM':
        month = dateBefore[i];
        break;

      case 'YY':
        year = dateBefore[i];
        break;

      case 'YYYY':
        year = dateBefore[i];
        break;

      default:
        break;
    }
  }

  for (const newFormat of toFormat) {
    switch (newFormat) {
      case 'DD':
        result.push(day);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'YY':
        result.push(yearFormat(year, newFormat));
        break;

      case 'YYYY':
        result.push(yearFormat(year, newFormat));
        break;

      default:
        break;
    }
  }

  return result.join(finalSep);
}

function yearFormat(year, format) {
  if (year.length === 4 && format === 'YY') {
    return year.slice(2);
  }

  if (year.length === 2 && format === 'YYYY') {
    return (parseInt(year) < 30)
      ? '20' + year
      : '19' + year;
  }

  return year;
}

module.exports = formatDate;
