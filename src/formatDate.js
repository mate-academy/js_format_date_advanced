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
  const SEPARATOR_BEFOR = fromFormat[fromFormat.length - 1];
  const SEPARATOR_AFTER = toFormat[toFormat.length - 1];

  let OLD_FORMAT_DATE = [];
  const NEW_FORMAT_DATE = [];
  const TEMP_OBJECT_BATE = {};

  const INDEX_FOOL = fromFormat.indexOf('YYYY');
  const INDEX_HALF_YEAR = fromFormat.indexOf('YY');

  OLD_FORMAT_DATE = date.split(SEPARATOR_BEFOR);

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    OLD_FORMAT_DATE[INDEX_FOOL] = (OLD_FORMAT_DATE[INDEX_FOOL]).slice(-2);
    fromFormat[INDEX_FOOL] = 'YY';
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (OLD_FORMAT_DATE[INDEX_HALF_YEAR] < 30) {
      OLD_FORMAT_DATE[INDEX_HALF_YEAR] = `20${OLD_FORMAT_DATE[INDEX_HALF_YEAR]}`;
      toFormat[toFormat.indexOf('YYYY')] = 'YY';
    } else {
      OLD_FORMAT_DATE[INDEX_HALF_YEAR] = `19${OLD_FORMAT_DATE[INDEX_HALF_YEAR]}`;
      toFormat[toFormat.indexOf('YYYY')] = 'YY';
    }
  }

  for (let i = 0; i < OLD_FORMAT_DATE.length; i++) {
    TEMP_OBJECT_BATE[fromFormat[i]] = OLD_FORMAT_DATE[i];
  }

  for (const key of toFormat) {
    if (!TEMP_OBJECT_BATE[key]) {
      break;
    }
    NEW_FORMAT_DATE.push(TEMP_OBJECT_BATE[key]);
  }

  return NEW_FORMAT_DATE.join(SEPARATOR_AFTER);
}

module.exports = formatDate;
