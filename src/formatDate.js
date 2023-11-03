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
  // write code here
  const dataHolder = {
  };

  let newData = '';

  const lastIndex = fromFormat.length - 1;

  const oldDateformats = fromFormat.slice(0, lastIndex);
  const oldSeparator = fromFormat.slice(lastIndex);

  const oldDateArray = date.split(oldSeparator);

  // need to separate date to an array;
  for (let i = 0; i < 3; i++) {
    dataHolder[oldDateformats[i]] = oldDateArray[i];
  }

  // couldnt put getter in object, so i put it here;
  // Oh well
  if (!dataHolder.YY) {
    const year = dataHolder.YYYY;

    dataHolder.YY = year.slice(-2);
  }

  if (!dataHolder.YYYY) {
    if (dataHolder.YY < 30) {
      dataHolder.YYYY = '20' + dataHolder.YY;
    } else {
      dataHolder.YYYY = '19' + dataHolder.YY;
    }
  }

  for (let i = 0; i < 3; i++) {
    newData += String(dataHolder[toFormat[i]]);

    if (i < 2) {
      newData += String(toFormat[3]);
    }
  }

  return newData;
}

module.exports = formatDate;
