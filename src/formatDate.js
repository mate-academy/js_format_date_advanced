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
  const result = [];
  const time = {
    DD: null,
    MM: null,
    YY: null,
    YYYY: null,
  };
  const rev = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    time[fromFormat[i]] = rev[i];
  }

  switch (null) {
    case time.YY:
      const hard = time.YYYY;
      const masiv = [];

      masiv.push(hard[2]);
      masiv.push(hard[3]);
      time.YY = masiv.join('');
      break;

    case time.YYYY:
      if (time.YY < 30) {
        time.YYYY = '20' + time.YY;
      } else {
        time.YYYY = '19' + time.YY;
      }
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    result.push(time[toFormat[j]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
