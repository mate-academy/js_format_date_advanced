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
  const dateArr = date.split(fromFormat[3]);

  for (const key in fromFormat) {
    switch (true) {
      case fromFormat[key] === 'YY' && dateArr[key] < 30:
        fromFormat.fill('YYYY', key, key + 1);
        dateArr[key] = (`20${dateArr[key]}`);
        break;

      case fromFormat[key] === 'YY' && dateArr[key] >= 30:
        fromFormat.fill('YYYY', key, key + 1);
        dateArr[key] = (`19${dateArr[key]}`);
        break;
    }
  }

  for (const key in toFormat) {
    switch (true) {
      case toFormat[key] === 'YY':
        toFormat.fill('YYYY', key, -1);
        dateArr[key] = String(Number(dateArr[key] - 1900));
    }
  }

  const fullDateObject = {};

  for (let i = 0; i < dateArr.length; i++) {
    const newObject = {
      [fromFormat[i]]: dateArr[i],
    };

    Object.assign(fullDateObject, newObject);
  }

  const newDateArray = [];

  for (let i = 0; i < dateArr.length; i++) {
    newDateArray.push(fullDateObject[toFormat[i]]);
  }

  const finalNewDate = newDateArray.join(toFormat[3]);

  return finalNewDate;
}

module.exports = formatDate;
