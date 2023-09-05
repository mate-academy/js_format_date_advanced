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
  const PARTS_OF_DATE = date.split(fromFormat[3]);
  const DATE_OBJECT = {};
  const newDateArray = [...toFormat.slice(0, -1)];

  let yearAndType = null;

  for (let i = 0; i < PARTS_OF_DATE.length; i++) {
    DATE_OBJECT[fromFormat[i]] = PARTS_OF_DATE[i];
  }

  for (let i = 0; i < newDateArray.length; i++) {
    if (DATE_OBJECT[newDateArray[i]]) {
      newDateArray[i] = DATE_OBJECT[newDateArray[i]];
    }
  }

  for (const part of newDateArray) {
    if (part.includes('YY')) {
      yearAndType = [part];
      break;
    }
  }

  if (yearAndType === null) {
    return newDateArray.join(toFormat[3]);
  } else {
    yearAndType[1] = yearAndType[0] === 'YYYY'
      ? DATE_OBJECT['YY']
      : DATE_OBJECT['YYYY'];

    if (yearAndType[0] === 'YYYY') {
      yearAndType[1] = (+yearAndType[1] < 30 ? 20 : 19) + yearAndType[1];
    } else {
      yearAndType[1] = yearAndType[1].slice(2);
    }

    for (let i = 0; i < newDateArray.length; i++) {
      if (newDateArray[i].includes('Y')) {
        newDateArray[i] = yearAndType[1];

        return newDateArray.join(toFormat[3]);
      }
    }
  }
}

module.exports = formatDate;
