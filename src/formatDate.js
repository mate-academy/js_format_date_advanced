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

  const fromDate = date.split(separator);
  const oldFormat = fromDate.concat(separator);
  const newSeparator = toFormat.pop();
  let fromFormat1 = [];

  if (countFrom === countTo) {
    for (let i = 0; i < fromFormat.length; i++) {
      if (fromFormat[i] !== toFormat[i]) {
        fromFormat1 = fromDate.reverse();
        break;
      }

      if (fromFormat[i] === toFormat[i]) {
        fromFormat1 = fromDate;
        break;
      }
    };
  };

  let firstItem;
  let lastItem;
  let year;
  let yearPart;

  if (countFrom < countTo) {
    if (fromSplit[0] === 'Y') {
      if (fromSplit[0] === toSplit[0]) {
        if (+oldFormat[0] < 30) {
          firstItem = fromDate.shift();
          year = 20 + firstItem;
          fromDate.unshift(year);
          fromFormat1 = fromDate;
        } else {
          firstItem = fromDate.shift();
          year = 19 + firstItem;
          fromDate.unshift(year);
          fromFormat1 = fromDate;
        };
      };
    };

    if (fromSplit[0] === 'Y') {
      if (fromSplit[0] !== toSplit[0]) {
        if (+oldFormat[0] < 30) {
          firstItem = fromDate.shift();
          year = 20 + firstItem;
          fromDate.unshift(year);
          fromFormat1 = fromDate.reverse();
        } else {
          firstItem = fromDate.shift();
          year = 19 + firstItem;
          fromDate.unshift(year);
          fromFormat1 = fromDate.reverse();
        };
      };
    };

    if (fromSplit[6] === 'Y') {
      if (fromSplit[6] === toSplit[6]) {
        if (+oldFormat[0] < 30) {
          lastItem = fromDate.pop();
          year = 20 + lastItem;
          fromDate.push(year);
          fromFormat1 = fromDate;
        } else {
          lastItem = fromDate.pop();
          year = 19 + lastItem;
          fromDate.push(year);
          fromFormat1 = fromDate;
        }
      };
    };

    if (fromSplit[6] === 'Y') {
      if (fromSplit[6] !== toSplit[6]) {
        if (+oldFormat[0] < 30) {
          lastItem = fromDate.pop();
          year = 20 + lastItem;
          fromDate.push(year);
          fromFormat1 = fromDate.reverse();
        } else {
          lastItem = fromDate.pop();
          year = 19 + lastItem;
          fromDate.push(year);
          fromFormat1 = fromDate.reverse;
        }
      }
    };
  };

  if (countFrom > countTo) {
    if (fromSplit[0] === 'Y') {
      if (fromSplit[0] === toSplit[0]) {
        year = fromDate.shift();
        yearPart = year.split('');
        lastItem = yearPart[2] + yearPart[3];
        fromDate.concat(lastItem);
        fromFormat1 = fromDate;
      }
    }

    if (fromSplit[0] === 'Y') {
      if (fromSplit[0] !== toSplit[0]) {
        year = fromDate.shift();
        yearPart = year.split('');
        lastItem = yearPart[2] + yearPart[3];
        fromDate.concat(lastItem);
        fromFormat1 = fromDate.reverse();
      };
    };

    if (fromSplit[6] === 'Y') {
      if (fromSplit[6] === toSplit[6]) {
        year = fromDate.pop();
        yearPart = year.split('');
        lastItem = yearPart[2] + yearPart[3];
        fromFormat1 = fromDate.concat(lastItem);
      }
    }

    if (fromSplit[6] === 'Y') {
      if (fromSplit[6] !== toSplit[6]) {
        year = fromDate.pop();
        yearPart = year.split('');
        lastItem = yearPart[2] + yearPart[3];
        fromDate.concat(lastItem);
        fromFormat1 = fromDate.reverse();
      }
    }
  };

  const newDate1 = fromFormat1.join(newSeparator);

  return newDate1;
}
module.exports = formatDate;
