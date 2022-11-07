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
  const newDate = new Array(toFormat.length - 1);
  let divider = '';
  let newDivider = '';

  for (const char of date) {
    if (isNaN(char)) {
      divider = char;
      break;
    }
  }

  const dateChanged = date.split(divider);
  const fromD = fromFormat.indexOf('DD');
  const fromM = fromFormat.indexOf('MM');
  const fromY = 3 - fromD - fromM;

  const currentDateObj = {
    D: dateChanged[fromD],
    M: dateChanged[fromM],
    Y: dateChanged[fromY],
  };

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i][0];

    if (toFormat[i].startsWith(key)) {
      newDate[i] = currentDateObj[key];
    }

    if (key === 'Y') {
      if (toFormat[i].length > newDate[i].length) {
        if (+newDate[i] < 30) {
          newDate[i] = '20' + newDate[i];
        } else {
          newDate[i] = '19' + newDate[i];
        }
      }

      if (toFormat[i].length < newDate[i].length) {
        newDate[i] = newDate[i].slice(2);
      }
    }
    newDivider = toFormat[toFormat.length - 1];
  }

  return newDate.join(newDivider);
}

module.exports = formatDate;
