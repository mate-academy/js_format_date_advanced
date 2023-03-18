'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` correctFormatay and the new `toFormat` correctFormatay.
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
  const separatorFromFormat = fromFormat.pop();
  const separatorToFormat = toFormat.pop();
  const numbersOfDate = date.split(separatorFromFormat);
  const currentFormat = {};
  const correctFormat = [];
  let i = 0;

  for (const format of fromFormat) {
    currentFormat[format] = numbersOfDate[i];
    i++;
  }

  let yearsFormat = 0;

  for (const newFormat of toFormat) {
    if (!fromFormat.includes(newFormat) && newFormat === 'YY') {
      yearsFormat = currentFormat['YYYY'] % 100;
      correctFormat.push(yearsFormat);
      continue;
    }

    if (!fromFormat.includes(newFormat) && newFormat === 'YYYY') {
      yearsFormat = convertYear(currentFormat['YY']);
      correctFormat.push(yearsFormat);
      continue;
    }
    correctFormat.push(currentFormat[newFormat]);
  }

  const result = correctFormat.join(separatorToFormat);

  return result;
}

function convertYear(year) {
  if (year < 30) {
    return '20' + year;
  } else {
    return '19' + year;
  }
}

module.exports = formatDate;
