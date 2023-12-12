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
  const factDate = date.split(fromFormat[fromFormat.length - 1]);
  const fromFormatCopy = [...fromFormat];
  const resultArray = [...toFormat];

  fromFormatCopy.splice(-1, 1);
  resultArray.splice(-1, 1);

  if ((fromFormatCopy.includes('YYYY') && toFormat.includes('YYYY'))
    || (fromFormatCopy.includes('YY') && toFormat.includes('YY'))) {
    for (let i = 0; i < fromFormatCopy.length; i++) {
      for (let j = 0; j < toFormat.length; j++) {
        if (fromFormatCopy[i] === toFormat[j]) {
          resultArray[j] = factDate[i];
        }
      }
    }
  }

  if (fromFormatCopy.includes('YYYY') && toFormat.includes('YY')) {
    const longDateIndex = fromFormatCopy.indexOf('YYYY');

    fromFormatCopy[longDateIndex] = 'YY';

    for (let i = 0; i < fromFormatCopy.length; i++) {
      for (let j = 0; j < toFormat.length; j++) {
        if (fromFormatCopy[i] === toFormat[j]) {
          resultArray[j] = factDate[i].slice(-2);
        }
      }
    }
  }

  if (fromFormatCopy.includes('YY') && toFormat.includes('YYYY')) {
    const shortDateIndex = fromFormatCopy.indexOf('YY');

    fromFormatCopy[shortDateIndex] = 'YYYY';

    if (factDate[shortDateIndex] < 30) {
      factDate[shortDateIndex] = `20${factDate[shortDateIndex]}`;
    } else {
      factDate[shortDateIndex] = `19${factDate[shortDateIndex]}`;
    }

    for (let i = 0; i < fromFormatCopy.length; i++) {
      for (let j = 0; j < toFormat.length; j++) {
        if (fromFormatCopy[i] === toFormat[j]) {
          resultArray[j] = factDate[i];
        }
      }
    }
  }

  return resultArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
