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
  const joinElementOld = fromFormat[fromFormat.length - 1];
  const joinElementNew = toFormat[toFormat.length - 1];

  const dateArray = date.split(joinElementOld);

  fromFormat.pop();

  const newDate = [];

  for (const element of fromFormat) {
    let oldIndex = fromFormat.indexOf(element);
    let newIndex = toFormat.indexOf(element);

    if (newIndex === -1) {
      if (toFormat.includes('YYYY')) {
        newIndex = toFormat.indexOf('YYYY');
        oldIndex = fromFormat.indexOf('YY');

        newDate[newIndex] = '20' + dateArray[oldIndex];

        if (dateArray[oldIndex] >= '30') {
          newDate[newIndex] = '19' + dateArray[oldIndex];
        }

        if (dateArray[oldIndex] < '30') {
          newDate[newIndex] = '20' + dateArray[oldIndex];
        }
      }

      if (toFormat.includes('YY')) {
        newIndex = toFormat.indexOf('YY');
        oldIndex = fromFormat.indexOf('YYYY');
        newDate[newIndex] = dateArray[oldIndex].slice(2);
      }
    } else {
      newDate[newIndex] = dateArray[oldIndex];
    }
  }

  return newDate.join(joinElementNew);
}

module.exports = formatDate;
