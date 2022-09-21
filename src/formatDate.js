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
  const dateObj = {
    'YYYY': 0,
    'YY': 0,
    'MM': 0,
    'DD': 0,
  };
  const dayArrayOld = date.split(fromFormat[fromFormat.length - 1]);
  const dayArray = [];
  const newSeparation = toFormat[toFormat.length - 1];

  let i = 0;

  for (const format of fromFormat) {
    switch (format) {
      case 'YY':
        dateObj.YY = dayArrayOld[i];

        if (+dateObj.YY >= 30) {
          dateObj.YYYY = '19' + dayArrayOld[i];
        } else {
          dateObj.YYYY = '20' + dayArrayOld[i];
        };
        break;

      case 'YYYY':
        dateObj.YY = dayArrayOld[i].slice(-2);
        dateObj.YYYY = dayArrayOld[i];
        break;

      case 'MM':
        dateObj.MM = dayArrayOld[i];
        break;

      case 'DD':
        dateObj.DD = dayArrayOld[i];
        break;
    };

    i++;
  };

  for (const key of toFormat) {
    if (dateObj[key]) {
      dayArray.push(dateObj[key]);
    };
  };

  return dayArray.join(newSeparation);
};

module.exports = formatDate;
