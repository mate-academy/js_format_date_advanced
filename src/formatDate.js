'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `oldFormat` array and the new `newFormat` array. Function returns
 * given date in new format.
 *   The function can change a separanewr, reorder the date parts of convert a
 * year old 4 digits new 2 digits and back.
 *   When converting old YYYY new YY just use 2 last digit (1997 -> 97).
 *   When converting old YY new YYYY use 20YY if YY < 30 and 19YY otherwise.
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
 * @param {string[]} oldFormat
 * @param {string[]} newFormat
 *
 * @returns {string}
 */

function formatDate(date, oldFormat, newFormat) {
  const splitedDate = date.split(oldFormat[3]);
  const dateObj = {};
  const newDateArr = [];

  for (let i = 0; i < oldFormat.length - 1; i++) {
    dateObj[oldFormat[i]] = splitedDate[i];
  };

  dateObj.divider = newFormat[3];

  newFormat.forEach((newDate) => {
    for (const oldDate in dateObj) {
      if (newDate === oldDate) {
        newDateArr.push(dateObj[oldDate]);
      } else if (oldDate === 'YYYY' & newDate === 'YY') {
        newDateArr.push(dateObj[oldDate].slice(-2));
      } else if (
        oldDate === 'YY'
        & newDate === 'YYYY') {
        if (+dateObj[oldDate] < 30) {
          newDateArr.push('20' + dateObj[oldDate]);
        } else {
          newDateArr.push('19' + dateObj[oldDate]);
        };
      };
    };
  });

  const newDateFormat = newDateArr.join(dateObj.divider);

  return newDateFormat;
};

module.exports = formatDate;
