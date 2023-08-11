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
  const OLD_SEPARATOR = fromFormat[fromFormat.length - 1];
  const NEW_SEPARATOR = toFormat[toFormat.length - 1];

  const eachDate = date.split(OLD_SEPARATOR);
  const correctDate = [];

  for (let i = 0; i < eachDate.length; i++) {
    const correctIndex = toFormat.indexOf(fromFormat[i]);

    correctDate[correctIndex] = eachDate[i];
  }

  const IF_FROM_FORMAT_HAVE_YYYY = fromFormat.includes('YYYY');
  const IF_FROM_FORMAT_HAVE_YY = fromFormat.includes('YY');
  const IF_TO_FORMAT_HAVE_YY = toFormat.includes('YY');
  const IF_TO_FORMAT_HAVE_YYYY = toFormat.includes('YYYY');

  const TO_FT_YYYY_INDEX = toFormat.indexOf('YYYY');
  const TO_FT_YY_INDEX = toFormat.indexOf('YY');
  const FROM_FT_YYYY_INDEX = fromFormat.indexOf('YYYY');
  const FROM_FT_YY_INDEX = fromFormat.indexOf('YY');

  if (IF_FROM_FORMAT_HAVE_YYYY && IF_TO_FORMAT_HAVE_YY) {
    correctDate[TO_FT_YY_INDEX]
      = eachDate[FROM_FT_YYYY_INDEX] % 100;
  }

  if (IF_TO_FORMAT_HAVE_YYYY && IF_FROM_FORMAT_HAVE_YY) {
    const century = eachDate[FROM_FT_YY_INDEX] < 30 ? '20' : '19';

    correctDate[TO_FT_YYYY_INDEX]
      = century + eachDate[FROM_FT_YY_INDEX];
  }

  return correctDate.join(NEW_SEPARATOR);
}

module.exports = formatDate;
