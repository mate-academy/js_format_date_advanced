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
  const dateSplitted = date.match(/\d+/g);
  const correctDate = [];

  for (let j = 0; j < toFormat.length; j++) {
    for (let i = 0; i < fromFormat.length; i++) {
      if (toFormat[j] === 'DD' && fromFormat[i] === 'DD') {
        correctDate.push(dateSplitted[i]);
      };

      if (toFormat[j] === 'MM' && fromFormat[i] === 'MM') {
        correctDate.push(dateSplitted[i]);
      };

      if (toFormat[j] === 'YYYY' || toFormat[j] === 'YY') {
        if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
          if (toFormat[j].length === fromFormat[i].length) {
            correctDate.push(dateSplitted[i]);
          }

          if (toFormat[j].length < fromFormat[i].length) {
            dateSplitted[i] = dateSplitted[i].split('');
            dateSplitted[i].shift();
            dateSplitted[i].shift();
            dateSplitted[i] = dateSplitted[i].join('');

            correctDate.push(dateSplitted[i]);
          };

          if (toFormat[j].length > fromFormat[i].length) {
            if (dateSplitted[i] < 30) {
              correctDate.push(+dateSplitted[i] + 2000);
            } else {
              correctDate.push(+dateSplitted[i] + 1900);
            }
          }
        };
      }
    };
  };

  return correctDate.join(toFormat[3]);
}

module.exports = formatDate;
