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
  const fullFromFormatYear = fromFormat.indexOf('YYYY');
  const shortFromFormatYear = fromFormat.indexOf('YY');
  const dayFromFormat = fromFormat.indexOf('DD');
  const monthFromFormat = fromFormat.indexOf('MM');
  const fullToFormatYear = toFormat.indexOf('YYYY');
  const shortToFormatYear = toFormat.indexOf('YY');
  const dayToFormat = toFormat.indexOf('DD');
  const monthToFormat = toFormat.indexOf('MM');
  const fullData = date.split(`${fromFormat[3]}`);
  const result = [];
  let year = '';

  result[dayToFormat] = fullData[dayFromFormat];
  result[monthToFormat] = fullData[monthFromFormat];

  if (fullFromFormatYear >= 0) {
    year = fullData[fullFromFormatYear];

    if (fullToFormatYear < 0) {
      year = year.slice(2, 4);
      result[shortToFormatYear] = year;
    }
  }

  if (shortFromFormatYear >= 0) {
    year = fullData[shortFromFormatYear];

    if (shortToFormatYear < 0) {
      if (year < 30) {
        year = 20 + year;
      } else {
        year = 19 + year;
      }
      result[fullToFormatYear] = year;
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
