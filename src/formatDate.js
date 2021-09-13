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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const arrDate = date.split(oldSeparator);
  const correctDateArr = [];
  // version 2
  // const oldFormat = {
  //   [fromFormat[0]]: arrDate[0],
  //   [fromFormat[1]]: arrDate[1],
  //   [fromFormat[2]]: arrDate[2],
  // };
  const newFormat = {
    [toFormat[0]]: 0,
    [toFormat[1]]: 0,
    [toFormat[2]]: 0,
  };

  // version 3
  //
  for (const key in newFormat) {
    for (let i = 0; i < fromFormat.length - 1; i++) {
      if (key === fromFormat[i]) {
        newFormat[key] = arrDate[i];
        correctDateArr.push(newFormat[key]);
        break;
      } else {
        if (key === 'YYYY' && fromFormat[i] === 'YY') {
          if (arrDate[i] < 30) {
            correctDateArr.push('20' + arrDate[i]);
            break;
          } else {
            correctDateArr.push('19' + arrDate[i]);
            break;
          }
        }

        if (key === 'YY' && fromFormat[i] === 'YYYY') {
          correctDateArr.push(arrDate[i].slice(2));
          break;
        }
      }
    }
  }

  // version 3
  //
  // for (const key in newFormat) {
  //   for (const oldKey in oldFormat) {
  //     if (key === oldKey) {
  //       newFormat[key] = oldFormat[oldKey];
  //       correctDateArr.push(newFormat[key]);
  //       break;
  //     } else {
  //       if (key === 'YYYY' && oldKey === 'YY') {
  //         if (oldFormat[oldKey] < 30) {
  //           correctDateArr.push('20' + oldFormat[oldKey]);
  //           break;
  //         } else {
  //           correctDateArr.push('19' + oldFormat[oldKey]);
  //           break;
  //         }
  //       }

  //       if (key === 'YY' && oldKey === 'YYYY') {
  //         correctDateArr.push(oldFormat[oldKey].slice(2));
  //         break;
  //       }
  //     }
  //   }
  // }

  // version 1
  //
  // for (let i = 0; i < toFormat.length - 1; i++) {
  //   for (let j = 0; j < fromFormat.length - 1; j++) {
  //     if (toFormat[i] === fromFormat[j]) {
  //       correctDateArr[i] = arrDate[j];
  //       break;
  //     } else {
  //       if (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') {
  //         if (arrDate[j] < 30) {
  //           correctDateArr[i] = '20' + arrDate[j];
  //         } else {
  //           correctDateArr[i] = '19' + arrDate[j];
  //         }
  //       }

  //       if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
  //         correctDateArr[i] = arrDate[j].slice(2);
  //       }
  //     }
  //   }
  // }

  return correctDateArr.join(newSeparator);
}

module.exports = formatDate;
