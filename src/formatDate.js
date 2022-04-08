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
  // write code here
  const prevSep = fromFormat[3];
  let num1, num3;
  let newStr;
  let num2;
  const startDate = date.split(prevSep);
  const [ s1, s2, s3 ] = fromFormat;
  const [ t1, , t3 ] = toFormat;

  if (s1[0] === 'Y' && t1[0] === 'Y') {
    if (s1.length > t1.length) {
      num1 = startDate[0].slice(2, 4);
    } else if (s1.length < t1.length) {
      if (startDate[0] < 30) {
        num1 = `20${startDate[0]}`;
      } else {
        num1 = `19${startDate[0]}`;
      }
    } else {
      num1 = startDate[0];
      num3 = startDate[2];
    }
    num3 = startDate[2];
  //   newStr.push(num1);
  }

  if (s1[0] === 'Y' && t3[0] === 'Y') {
    if (s1.length > t3.length) {
      num3 = startDate[0].slice(2, 4);
    } else if (s1.length < t3.length) {
      if (startDate[0] < 30) {
        num3 = `20${startDate[0]}`;
      } else {
        num3 = `19${startDate[0]}`;
      }
    } else {
      num3 = startDate[0];
    }
    num1 = startDate[2];
    // newStr.push(num3);
  }

  if (s3[0] === 'Y' && t1[0] === 'Y') {
    if (s3.length > t1.length) {
      num1 = startDate[2].slice(2, 4);
    } else if (s3.length < t1.length) {
      if (startDate[2] < 30) {
        num1 = `20${startDate[2]}`;
      } else {
        num1 = `19${startDate[2]}`;
      }
    } else {
      num1 = startDate[2];
    }
    num3 = startDate[0];
    // newStr.push(num1);
  }

  if (s3[0] === 'Y' && t3[0] === 'Y') {
    if (s3.length > t3.length) {
      num3 = startDate[2].slice(2, 4);
    } else if (s3.length < t3.length) {
      if (startDate[2] < 30) {
        num3 = `20${startDate[2]}`;
      } else {
        num3 = `19${startDate[2]}`;
      }
    } else {
      num3 = startDate[2];
    }
    num1 = startDate[0];
    // newStr.push(num3)
  }

  if (s2[0] === 'Y' && t3[0] === 'Y') {
    if (s1.length > t1.length) {
      num3 = startDate[0].slice(2, 4);
    } else if (s1.length < t1.length) {
      if (startDate[0] < 30) {
        num3 = `20${startDate[0]}`;
      } else {
        num3 = `19${startDate[0]}`;
      }
    } else {
      num3 = startDate[1];
    }
    num1 = startDate[2];

    num2 = startDate[0];
    newStr = [num1, num2, num3];

    return newStr.join(toFormat[3]);
    //   newStr.push(num1);
  }

  num2 = startDate[1];

  newStr = [num1, num2, num3];

  return newStr.join(toFormat[3]);
}

module.exports = formatDate;
