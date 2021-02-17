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
  let separator;
  const newDate = date.split('');

  for (let i = 0; i < newDate.length; i++) {
    if (isNaN(newDate[i])) {
      separator = newDate[i];
    };
  };

  const tempFrom = fromFormat.join();
  const tempTo = toFormat.join();
  const fromSplit = tempFrom.split('');
  const toSplit = tempTo.split('');
  let countFrom = 0;
  let countTo = 0;

  for (let i = 0; i < fromSplit.length; i++) {
    if (fromSplit[i] === 'Y') {
      countFrom++;
    };
  };

  for (let i = 0; i < toSplit.length; i++) {
    if (toSplit[i] === 'Y') {
      countTo++;
    };
  };

  const nD = date.split(separator);
  const oldFormat = nD.concat(separator);
  const newSeparator = toFormat.pop();
  // const sep = fromFormat.pop();
  let fromFormat1 = [];

  if (countFrom === countTo) {
    for (let i = 0; i < fromFormat.length; i++) {
      if (fromFormat[i] !== toFormat[i]) {
        fromFormat1 = nD.reverse();
        break;
      }

      if (fromFormat[i] === toFormat[i]) {
        fromFormat1 = nD;
        break;
      }
    };
  };

  let nD0;
  let nDlast;
  let temp;
  let temp1;

  if (countFrom < countTo) {
    if (fromSplit[0] === 'Y' && fromSplit[0] === toSplit[0]) {
      if (+oldFormat[0] < 30) {
        nD0 = nD.shift();
        temp = 20 + nD0;
        nD.unshift(temp);
        fromFormat1 = nD;
      } else {
        nD0 = nD.shift();
        temp = 19 + nD0;
        nD.unshift(temp);
        fromFormat1 = nD;
      };
    };

    if (fromSplit[0] === 'Y' && fromSplit[0] !== toSplit[0]) {
      if (+oldFormat[0] < 30) {
        nD0 = nD.shift();
        temp = 20 + nD0;
        nD.unshift(temp);
        fromFormat1 = nD.reverse();
      } else {
        nD0 = nD.shift();
        temp = 19 + nD0;
        nD.unshift(temp);
        fromFormat1 = nD.reverse();
      };
    };

    if (fromSplit[6] === 'Y' && fromSplit[6] === toSplit[6]) {
      if (+oldFormat[0] < 30) {
        nDlast = nD.pop();
        temp = 20 + nDlast;
        nD.push(temp);
        fromFormat1 = nD;
      } else {
        nDlast = nD.pop();
        temp = 19 + nDlast;
        nD.push(temp);
        fromFormat1 = nD;
      }
    };

    if (fromSplit[6] === 'Y' && fromSplit[6] !== toSplit[6]) {
      if (+oldFormat[0] < 30) {
        nDlast = nD.pop();
        temp = 20 + nDlast;
        nD.push(temp);
        fromFormat1 = nD.reverse();
      } else {
        nDlast = nD.pop();
        temp = 19 + nDlast;
        nD.push(temp);
        fromFormat1 = nD.reverse;
      }
    }
  };

  if (countFrom > countTo) {
    if (fromSplit[0] === 'Y' && fromSplit[0] === toSplit[0]) {
      temp = nD.shift();
      temp1 = temp.split('');
      nDlast = temp1[2] + temp1[3];
      nD.concat(nDlast);
      fromFormat1 = nD;
    }

    if (fromSplit[0] === 'Y' && fromSplit[0] !== toSplit[0]) {
      temp = nD.shift();
      temp1 = temp.split('');
      nDlast = temp1[2] + temp1[3];
      nD.concat(nDlast);
      fromFormat1 = nD.reverse();
    };

    if (fromSplit[6] === 'Y' && fromSplit[6] === toSplit[6]) {
      temp = nD.pop();
      temp1 = temp.split('');
      nDlast = temp1[2] + temp1[3];
      fromFormat1 = nD.concat(nDlast);
    }

    if (fromSplit[6] === 'Y' && fromSplit[6] !== toSplit[6]) {
      temp = nD.pop();
      temp1 = temp.split('');
      nDlast = temp1[2] + temp1[3];
      nD.concat(nDlast);
      fromFormat1 = nD.reverse();
    }
  };

  // const newFormat = fromFormat1.concat(separator);
  // let dateFormat = fromFormat.splice(0, fromFormat.length, ...newFormat);
  const newDate1 = fromFormat1.join(newSeparator);

  return newDate1;
}
module.exports = formatDate;
