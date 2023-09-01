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
  const [firstOldElem, secondOldElem, thirdOldElem, oldStparator] = fromFormat;
  const normalDate = date.split(oldStparator);
  const objOldFormatDate = {};

  objOldFormatDate[firstOldElem] = normalDate[0];
  objOldFormatDate[secondOldElem] = normalDate[1];
  objOldFormatDate[thirdOldElem] = normalDate[2];

  const arrNewFormatDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      if (toFormat[i] in objOldFormatDate) {
        arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
        continue;
      } else {
        arrNewFormatDate.push(objOldFormatDate['YYYY'].slice(2, 4));
        continue;
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (toFormat[i] in objOldFormatDate) {
        arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
        continue;
      } else {
        if (objOldFormatDate['YY'] < 30) {
          arrNewFormatDate.push('20' + objOldFormatDate['YY']);
          continue;
        } else {
          arrNewFormatDate.push('19' + objOldFormatDate['YY']);
          continue;
        }
      }
    }
    arrNewFormatDate.push(objOldFormatDate[toFormat[i]]);
  }

  const [, , , separNew] = toFormat;
  const resultingString = arrNewFormatDate.join(separNew);

  return resultingString;
}

module.exports = formatDate;
