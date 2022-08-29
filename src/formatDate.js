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
  const oldSepearator = fromFormat[3];
  const newSeparator = toFormat[3];
  const numbersOfDate = date.split(oldSepearator);
  const valuesOfDate = {};
  const newFormat = [];

  valuesOfDate[fromFormat[0]] = numbersOfDate[0];
  valuesOfDate[fromFormat[1]] = numbersOfDate[1];
  valuesOfDate[fromFormat[2]] = numbersOfDate[2];

  if (fromFormat.includes('YY')) {
    if (valuesOfDate.YY < 30) {
      valuesOfDate.YYYY = `20${valuesOfDate.YY}`;
    } else {
      valuesOfDate.YYYY = `19${valuesOfDate.YY}`;
    }
  } else {
    valuesOfDate.YY = valuesOfDate.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newFormat.push(valuesOfDate.DD);
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(valuesOfDate.MM);
    }

    if (toFormat[i] === 'YY') {
      newFormat.push(valuesOfDate.YY);
    }

    if (toFormat[i] === 'YYYY') {
      newFormat.push(valuesOfDate.YYYY);
    }
  }

  return newFormat.join(newSeparator);
}

module.exports = formatDate;
