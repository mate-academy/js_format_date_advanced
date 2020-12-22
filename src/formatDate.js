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
  const oldDate = date.split(fromFormat[3]);
  const fromFormatCopy = [...fromFormat];
  const newDate = Array(3);
  const currentDDIndex = fromFormat.indexOf('DD');
  const newDDIndex = toFormat.indexOf('DD');
  const currentMMIndex = fromFormat.indexOf('MM');
  const newMMIndex = toFormat.indexOf('MM');

  if (fromFormatCopy.includes('YY') && toFormat.includes('YYYY')) {
    const indexOfYear = fromFormatCopy.indexOf('YY');

    if (oldDate[indexOfYear] >= 30) {
      oldDate[indexOfYear] = '19' + oldDate[indexOfYear];
    } else {
      oldDate[indexOfYear] = '20' + oldDate[indexOfYear];
    }
    newDate[toFormat.indexOf('YYYY')] = oldDate[indexOfYear];

    fromFormatCopy[fromFormatCopy.indexOf('YY')] += 'YY';
  }

  if (fromFormatCopy.includes('YYYY') && toFormat.includes('YY')) {
    const indexOfYear = fromFormatCopy.indexOf('YYYY');

    oldDate[indexOfYear] = oldDate[indexOfYear].slice(2);
    newDate[toFormat.indexOf('YY')] = oldDate[indexOfYear];
    fromFormatCopy[indexOfYear] = 'YY';
  }

  if (fromFormatCopy.includes('YYYY') && toFormat.includes('YYYY')) {
    newDate[toFormat.indexOf('YYYY')] = oldDate[fromFormatCopy.indexOf('YYYY')];
  } else if (fromFormatCopy.includes('YY') && toFormat.includes('YY')) {
    newDate[toFormat.indexOf('YY')] = oldDate[fromFormatCopy.indexOf('YY')];
  }

  if (currentDDIndex !== newDDIndex) {
    newDate[newDDIndex] = oldDate[currentDDIndex];
  } else {
    newDate[newDDIndex] = oldDate[newDDIndex];
  }

  if (currentMMIndex !== newMMIndex) {
    newDate[newMMIndex] = oldDate[currentMMIndex];
  } else {
    newDate[newMMIndex] = oldDate[newMMIndex];
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
