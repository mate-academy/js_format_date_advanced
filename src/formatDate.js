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
  const resultDat = date.split(fromFormat[3]);

  const resultDate = res(resultDat, fromFormat, toFormat);
  // const yerFF = yer(fromFormat);
  const yerTF = yer(toFormat);

  if (resultDate[yerTF].length < toFormat[yerTF].length) {
    if (resultDate[yerTF] < 30) {
      resultDate[yerTF] = '20' + resultDate[yerTF];
    } else {
      resultDate[yerTF] = '19' + resultDate[yerTF];
    }

    return resultDate.join(toFormat[3]);
  }

  if (resultDate[yerTF].length === toFormat[yerTF].length) {
    return resultDate.join(toFormat[3]);
  }

  resultDate[yerTF] = resultDate[yerTF].slice(2);

  return resultDate.join(toFormat[3]);
}

function res(date, fFormat, tFormat) {
  const result = [];

  for (let i = 0; i < tFormat.length; i++) {
    for (let a = 0; a < fFormat.length; a++) {
      if (
        tFormat[i] === fFormat[a]
        || (tFormat[i] === 'YY' && fFormat[a] === 'YYYY')
        || (tFormat[i] === 'YYYY' && fFormat[a] === 'YY')) {
        result[i] = date[a];
      }
    }
  }

  result.length = 3;

  return result;
}

function yer(format) {
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YY' || format[i] === 'YYYY') {
      return i;
    }
  }
}

module.exports = formatDate;
