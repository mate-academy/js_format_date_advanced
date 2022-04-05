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
  const arrDate = date.split(fromFormat[3]);
  const resArr = [];
  let result = '';

  if (toFormat[0] === 'DD') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'DD') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[0] === 'MM') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'MM') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[0] === 'YY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i].slice(2));
      }
    }
  }

  if (toFormat[0] === 'YYYY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] >= 30) {
        resArr.push('19' + arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] < 30) {
        resArr.push('20' + arrDate[i]);
      }
    }
  }
  // Second element

  if (toFormat[1] === 'DD') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'DD') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[1] === 'MM') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'MM') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[1] === 'YY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i].slice(2));
      }
    }
  }

  if (toFormat[1] === 'YYYY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] >= 30) {
        resArr.push('19' + arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] < 30) {
        resArr.push('20' + arrDate[i]);
      }
    }
  }
  // 3-Th element

  if (toFormat[2] === 'DD') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'DD') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[2] === 'MM') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'MM') {
        resArr.push(arrDate[i]);
      }
    }
  }

  if (toFormat[2] === 'YY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i].slice(2));
      }
    }
  }

  if (toFormat[2] === 'YYYY') {
    for (let i = 0; i <= 2; i++) {
      if (fromFormat[i] === 'YYYY') {
        resArr.push(arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] >= 30) {
        resArr.push('19' + arrDate[i]);
      }

      if (fromFormat[i] === 'YY' && arrDate[i] < 30) {
        resArr.push('20' + arrDate[i]);
      }
    }
  }
  result += resArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
