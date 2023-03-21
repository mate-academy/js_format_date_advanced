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
  const splitedDate = date.split(fromFormat[3]);
  const dateStructre = {
    [fromFormat[0]]: splitedDate[0],
    [fromFormat[1]]: splitedDate[1],
    [fromFormat[2]]: splitedDate[2],
  };
  const yearNow = new Date().getFullYear() - 2000;
  const fromYear = fromFormat.indexOf('YY') >= 0 ? 2 : 4;
  const toYear = toFormat.indexOf('YY') >= 0 ? 2 : 4;
  const result = [];

  toFormat.forEach((elem, i) => {
    if (i < 3) {
      if (!dateStructre[elem] && fromYear > toYear) {
        result[i] = (dateStructre[elem + elem]).slice(2);
      } else if (!dateStructre[elem] && fromYear < toYear) {
        const formatedYear = dateStructre[elem.slice(2)] < yearNow
          ? '20' + dateStructre[elem.slice(2)]
          : '19' + dateStructre[elem.slice(2)];

        result[i] = formatedYear;
      } else {
        result[i] = dateStructre[elem];
      }
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
