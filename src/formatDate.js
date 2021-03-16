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
  const dateArr = date.split(fromFormat[3]);
  const res = [];

  const dateObj = {};

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; i < dateArr.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (!dateObj.hasOwnProperty(toFormat[i])) {
        if (dateObj['YY'] >= 30) {
          res.push(1900 + +dateObj['YY']);
        } else {
          res.push(2000 + +dateObj['YY']);
        }
      } else {
        res.push(+dateObj[toFormat[i]]);
      }
    } else if (toFormat[i] === 'YY') {
      if (!dateObj.hasOwnProperty(toFormat[i])) {
        const help = dateObj['YYYY'].split('');

        help.shift();
        help.shift();
        res.push(help.join(''));
      } else {
        res.push(+dateObj[toFormat[i]]);
      }
    } else {
      res.push(dateObj[toFormat[i]]);
    }
  }

  return res.join(toFormat[3]);
}
// function formatDate(date, fromFormat, toFormat) {
//   const dateArr = date.split(fromFormat[3]);

//   if (fromFormat[0] !== 'DD' && fromFormat[1] !== 'DD') {
//     dateArr.reverse();
//   }

//   const year = dateArr[2].split('');

//   if (toFormat[0] !== 'DD' && toFormat[1] !== 'DD') {
//     dateArr.reverse();

//     if (toFormat[0] === 'YYYY') {
//       if (year.length === 2) {
//         if (dateArr[0] >= 30) {
//           dateArr[0] = 1900 + +dateArr[0];
//         } else {
//           dateArr[0] = 2000 + +dateArr[0];
//         }
//       }
//     } else if (toFormat[2] === 'YY') {
//       if (year.length > 2) {
//         dateArr[0] = year.shift().shift().join('');
//         // dateArr[2] = year.join('');
//       }
//     }

//     return dateArr.join(toFormat[3]);
//   } else {
//     if (toFormat[2] === 'YYYY') {
//       if (year.length === 2) {
//         if (dateArr[2] > 30) {
//           dateArr[2] = 1900 + +dateArr[2];
//         } else {
//           dateArr[2] = 2000 + +dateArr[2];
//         }
//       }
//     } else if (toFormat[2] === 'YY') {
//       if (year.length > 2) {
//         year.shift();
//         year.shift();
//         dateArr[2] = year.join('');
//       }
//     }

//     return dateArr.join(toFormat[3]);
//   }
// }

module.exports = formatDate;
