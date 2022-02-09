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
  let indexTo = 0;
  let indexFrom = 0;
  const result = [];
  const dateSplit = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case fromFormat[0]:
        result[i] = dateSplit[0];
        break;

      case fromFormat[1]:
        result[i] = dateSplit[1];
        break;

      case fromFormat[2]:
        result[i] = dateSplit[2];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    let found = false;

    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (toFormat[i] === fromFormat[j]) {
        found = true;
        break;
      }
    }

    if (found === false) {
      indexTo = i;

      if (dateSplit[indexFrom] < 30 && toFormat[indexTo].length > 2) {
        result[indexTo] = 20 + `${dateSplit[indexFrom]}`;
      } else if (fromFormat[indexFrom].length > toFormat[indexTo].length) {
        result[indexTo] = dateSplit[indexFrom].slice(2);
      } else if (dateSplit[indexFrom] >= 30 && toFormat[indexTo].length > 2) {
        result[indexTo] = 19 + `${dateSplit[indexFrom]}`;
      }
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let found = false;

    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        found = true;
        break;
      }
    }

    if (found === false) {
      indexFrom = i;

      if (dateSplit[indexFrom] < 30 && toFormat[indexTo].length > 2) {
        result[indexTo] = 20 + `${dateSplit[indexFrom]}`;
      } else if (fromFormat[indexFrom].length > toFormat[indexTo].length) {
        result[indexTo] = dateSplit[indexFrom].slice(2);
      } else if (dateSplit[indexFrom] >= 30 && toFormat[indexTo].length > 2) {
        result[indexTo] = 19 + `${dateSplit[indexFrom]}`;
      }
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
