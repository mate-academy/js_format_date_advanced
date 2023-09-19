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
  const newDate = [];
  const separator = fromFormat[3];
  const uva = date.split(separator);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = uva[fromFormat.indexOf('DD')];
    } else if (toFormat[i] === 'MM') {
      newDate[i] = uva[fromFormat.indexOf('MM')];
    } else {
      // newDate[i] = ... {year}
      let j = 0;

      for (j; j < 3; j++) {
        if (fromFormat[j][0] === 'Y') {
          break;
        }
      }

      if (toFormat[i] === 'YY') {
        newDate[i] = uva[j].length === 2 ? uva[j] : uva[j].substring(2, 4);
      } else {
        newDate[i] = uva[j].length === 4 ? uva[j]
          : (uva[j] < 30 ? uva[j].padStart(4, 20) : uva[j].padStart(4, 19));
      }
    }
  }

  const separator2 = toFormat[3];
  const res = newDate.join(separator2);

  return res;
}

module.exports = formatDate;
