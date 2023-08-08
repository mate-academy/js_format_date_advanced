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
 *
 *
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const prefixYear = (yearBefore, newFormat) => {
    const yearUpdateFormat
      = newFormat.find(partDate => partDate.includes('YY'));

    const previousCentury = '19';
    const currentCentury = '20';
    const toDetermineCentury = 30;

    if (yearBefore.length === yearUpdateFormat.length) {
      return yearBefore;
    }

    if (yearBefore.toString().length > yearUpdateFormat.length) {
      return yearBefore.slice(-2);
    }

    if (yearUpdateFormat.length === 4 && yearBefore >= toDetermineCentury) {
      return previousCentury + yearBefore;
    }

    if (yearUpdateFormat.length === 4 && yearBefore < toDetermineCentury) {
      return currentCentury + yearBefore;
    }

    return yearBefore;
  };

  const newFormatDate = [];
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const indexYY = fromFormat
    .findIndex((partDate) => partDate === 'YY' || partDate === 'YYYY');

  const indexMM = fromFormat.indexOf('MM');
  const indexDD = fromFormat.indexOf('DD');

  const day = dateArr[indexDD];
  const month = dateArr[indexMM];
  const year = dateArr[indexYY];

  for (let i = 0; i < toFormat.length; i++) {
    const separator = toFormat[toFormat.length - 1];

    if (toFormat[i] === 'DD') {
      newFormatDate.push(day);
      newFormatDate.push(separator);

    }

    if (toFormat[i] === 'MM') {
      newFormatDate.push(month);
      newFormatDate.push(separator);
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      const yearUpdate = prefixYear(year, toFormat);

      newFormatDate.push(yearUpdate);
      newFormatDate.push(separator);
    }
  }

  return newFormatDate.join('').slice(0, -1);
}

module.exports = formatDate;
