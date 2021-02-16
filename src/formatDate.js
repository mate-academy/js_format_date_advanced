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
  const indexBigYear = fromFormat.indexOf('YYYY');
  const indexSmallYear = fromFormat.indexOf('YY');
  const indexMonth = fromFormat.indexOf('MM');
  const indexDays = fromFormat.indexOf('DD');
  const splitDate = date.split(fromFormat[3]);
  const formatedDate = [];

  for (let i = 0; i < splitDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formatedDate.push(splitDate[indexDays]);
        break;

      case 'MM':
        formatedDate.push(splitDate[indexMonth]);
        break;

      case 'YY':
        if (toFormat.indexOf('YY') === indexSmallYear) {
          formatedDate.push(splitDate[indexSmallYear]);
        } else {
          formatedDate.push(splitDate[indexBigYear].slice(2));
        }
        break;

      case 'YYYY':
        if (+splitDate[indexSmallYear] > 20) {
          formatedDate.push(`19${splitDate[indexSmallYear]}`);
        } else if (+splitDate[indexSmallYear] <= 30) {
          formatedDate.push(`20${splitDate[indexSmallYear]}`);
        } else {
          formatedDate.push(splitDate[indexBigYear]);
        }
        break;
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
