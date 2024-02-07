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
  const start = [];
  let count = 0;
  const newDate = getDate(date);

  for (let i = 0; i < newDate.length; i++) {
    start.push([fromFormat[i], newDate[i]]);
  }

  while (count < 3) {
    let index = fromFormat.findIndex((el) => {
      return el === toFormat[count];
    });

    if (index === -1) {
      if (toFormat.includes('YY')) {
        index = fromFormat.indexOf('YYYY');
        newDate[count] = (start[index][1]).slice(2, 4);
      } else {
        index = fromFormat.indexOf('YY');

        if (start[index][1] >= 30) {
          newDate[count] = '19' + start[index][1];
        } else {
          newDate[count] = '20' + start[index][1];
        }
      }
    } else {
      newDate[count] = start[index][1];
    }

    count++;
  };

  return newDate.join(toFormat[3]);
}

function getDate(date) {
  let newDate = [];

  if (date.length === 10 && Number(date[2])) {
    newDate = date.split(date[4]);
  } else {
    newDate = date.split(date[2]);
  }

  return newDate;
}

module.exports = formatDate;
