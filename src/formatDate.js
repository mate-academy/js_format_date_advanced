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
  const dateList = date.split(fromFormat[3]);
  const newDateList = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case `DD`:
        newDateList.push(dateList[fromFormat.indexOf(`DD`)]);
        break;

      case `MM`:
        newDateList.push(dateList[fromFormat.indexOf(`MM`)]);
        break;

      case `YY`:
        if (fromFormat.indexOf(`YY`) !== -1) {
          newDateList.push(dateList[fromFormat.indexOf(`YY`)]);
        } else {
          newDateList.push(dateList[fromFormat.indexOf(`YYYY`)].slice(2));
        }
        break;

      case `YYYY`:
        if (fromFormat.indexOf(`YYYY`) !== -1) {
          newDateList.push(dateList[fromFormat.indexOf(`YYYY`)]);
        } else if (dateList[fromFormat.indexOf(`YY`)][0] > 2) {
          newDateList.push(`19` + dateList[fromFormat.indexOf(`YY`)]);
        } else {
          newDateList.push(`20` + dateList[fromFormat.indexOf(`YY`)]);
        }
    }
  }

  return newDateList.join(toFormat[3]);
}

module.exports = formatDate;
