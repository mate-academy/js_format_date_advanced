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
  const result = [];
  const [, , , separateOld] = fromFormat;
  const separateNew = toFormat[3];

  const oldData = date.split(separateOld);
  const indDay = fromFormat.indexOf('DD');
  const indMonth = fromFormat.indexOf('MM');
  let indYear = fromFormat.indexOf('YY');

  if (indYear === -1) {
    indYear = fromFormat.indexOf('YYYY');
  }

  let reNewYear = oldData[indYear];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    reNewYear = oldData[indYear].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (reNewYear < 30) {
      reNewYear = `20${reNewYear}`;
    } else {
      reNewYear = `19${reNewYear}`;
    }
  }

  if (toFormat.indexOf('DD') === 0 && toFormat.indexOf('MM') === 1) {
    result.push(oldData[indDay], oldData[indMonth], reNewYear);

    return result.join(separateNew);
  }

  if (toFormat.indexOf('DD') === 2 && toFormat.indexOf('MM') === 1) {
    result.push(oldData[indDay], oldData[indMonth], reNewYear);

    return result.reverse().join(separateNew);
  }

  if (toFormat.indexOf('YY' || 'YYYY') && toFormat.indexOf('MM') === 2) {
    result.push(oldData[indDay], reNewYear, oldData[indMonth]);

    return result.join(separateNew);
  }

  if (
    (toFormat.indexOf('YY' || 'YYYY') === 1 && toFormat.indexOf('MM') === 0)) {
    result.push(oldData[indDay], reNewYear, oldData[indMonth]);

    return result.reverse().join(separateNew);
  }

  if (toFormat.indexOf('MM') === 0 && toFormat.indexOf('DD') === 1) {
    result.push(oldData[indMonth], oldData[indDay], reNewYear);

    return result.join(separateNew);
  }
}

module.exports = formatDate;
