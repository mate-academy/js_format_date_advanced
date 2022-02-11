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

// function formatDate(date, fromFormat, toFormat) {
//   // write code here
//   const j = fromFormat.slice();
//   const k = toFormat.slice();

//   const [a1, , , d1] = j.sort();
//   const [a2, , , d2] = k.sort();
//   let [a, b, c] = date.split(a1);

//   if (d1.length > d2.length) {
//     if (a.length === 4) {
//       a = a.slice(2, 4);
//     } else if (c.length === 4) {
//       c = c.slice(2, 4);
//     } else if (b.length === 4) {
//       b = b.slice(2, 4);
//     }
//   }

//   if (d1.length < d2.length) {
//     if (j[0][0] === k[0][0] || j[0][0] === k[2][0]
//        || j[2][0] === k[0][0] || j[2][0] === k[2][0]) {
//       if (a <= 22) {
//         a = `20${a}`;
//       } else if (a > 22) {
//         a = `19${a}`;
//       }
//     }
//   }

//   if (fromFormat[0][0] === toFormat[1][0] && fromFormat[0][0] === 'Y') {
//     return [b, a, c].join(a2);
//   }

//   if (fromFormat[0][0] === toFormat[2][0] && fromFormat[0][0] === 'Y') {
//     return [c, b, a].join(a2);
//   }

//   if (fromFormat[1][0] === toFormat[0][0] && fromFormat[1][0] === 'Y') {
//     return [a, c, b].join(a2);
//   }

//   if (fromFormat[1][0] === toFormat[2][0] && fromFormat[1][0] === 'Y') {
//     return [c, a, b].join(a2);
//   }

//   if (fromFormat[2][0] === toFormat[0][0] && fromFormat[2][0] === 'Y') {
//     return [c, b, a].join(a2);
//   }

//   if (fromFormat[2][0] === toFormat[1][0] && fromFormat[2][0] === 'Y') {
//     return [c, b, a].join(a2);
//   }

//   return [a, b, c].join(a2);
// }

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const j = fromFormat.slice();
  const j1 = fromFormat.slice();
  const k = toFormat.slice();
  const k1 = toFormat.slice();

  const [a1, , , d1] = j.sort();
  const [a2, , , d2] = k.sort();

  const dateArr = date.split(a1);
  const result = [];

  for (let i = 0; i < 3; i++) {
    if (k1[0].slice(0, 1) === j1[i].slice(0, 1)) {
      result.push(dateArr[i]);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (k1[1].slice(0, 1) === j1[i].slice(0, 1)) {
      result.push(dateArr[i]);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (k1[2].slice(0, 1) === j1[i].slice(0, 1)) {
      result.push(dateArr[i]);
    }
  }

  let [a, b, c] = result;

  if (d1.length > d2.length) {
    if (a.length === 4) {
      a = a.slice(2, 4);
    } else if (c.length === 4) {
      c = c.slice(2, 4);
    } else if (b.length === 4) {
      b = b.slice(2, 4);
    }
  }

  if (d1.length < d2.length) {
    if (j[0][0] === k[0][0] || j[0][0] === k[1][0] || j[0][0] === k[2][0]
       || j[1][0] === k[0][0] || j[0][0] === k[1][0] || j[0][0] === k[2][0]
       || j[2][0] === k[0][0] || j[2][0] === k[1][0] || j[2][0] === k[2][0]) {
      if (a <= 22) {
        a = `20${a}`;
      } else if (a > 22) {
        a = `19${a}`;
      }
    }
  }

  return [a, b, c].join(a2);
}

module.exports = formatDate;
