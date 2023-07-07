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
  const splitedDate = date.split(fromFormat[3]);
  const partsOfDate = {};
  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        partsOfDate.YYYY = splitedDate[i];
        break;

      case 'YY':
        partsOfDate.YY = splitedDate[i];
        break;

      case 'MM':
        partsOfDate.MM = splitedDate[i];
        break;

      case 'DD':
        partsOfDate.DD = splitedDate[i];
        break;
    }
  }

  for (const element in partsOfDate) {
    if (element === 'YYYY') {
      partsOfDate.YY = transformYear(
        partsOfDate.YY || partsOfDate.YYYY, fromFormat, toFormat
      );
    }

    if (element === 'YY') {
      partsOfDate.YYYY = transformYear(
        partsOfDate.YY || partsOfDate.YYYY, fromFormat, toFormat
      );
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result[result.length] = partsOfDate.DD;
        break;

      case 'MM':
        result[result.length] = partsOfDate.MM;
        break;

      case 'YY':
        result[result.length] = partsOfDate.YY;
        break;

      case 'YYYY':
        result[result.length] = partsOfDate.YYYY;
        break;
    }
  }

  return result.join(toFormat[3]);
};

function transformYear(year, oldFormat) {
  const correctYear = [];

  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i] === 'YYYY') {
      correctYear.push(year.slice(2, 4));
    }

    if (oldFormat[i] === 'YY') {
      const addition = year < 30 ? '20' : '19';

      correctYear.push(addition + year);
    }
  }

  return correctYear.join('');
}

module.exports = formatDate;
