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
  const yearFormatYY = 'YY';
  const yearFormatYYYY = 'YYYY';
  const dayFormat = 'DD';
  const monthFormat = 'MM';
  const getPrefixYear = (yearBefore, newFormat) => {
    const yearUpdateFormat
      = newFormat.find(partDate => partDate.includes(yearFormatYY));

    if (yearBefore.length === yearUpdateFormat.length) {
      return yearBefore;
    }

    const PREVIOUS_CENTURY = '19';
    const CURRENT_CENTURY = '20';
    const toDetermineCentury = 30;

    if (yearBefore.toString().length > yearUpdateFormat.length) {
      return yearBefore.slice(-2);
    }

    if (yearUpdateFormat.length === 4) {
      const century = yearBefore < toDetermineCentury
        ? CURRENT_CENTURY
        : PREVIOUS_CENTURY;

      return century + yearBefore;
    }
  };

  const newFormatDate = [];
  const splittedOldDate = date.split(fromFormat[fromFormat.length - 1]);
  const indexYY = fromFormat
    .findIndex((partDate) =>
      partDate === yearFormatYY || partDate === yearFormatYYYY);

  const indexForMounth = fromFormat.indexOf(monthFormat);
  const indexForDay = fromFormat.indexOf(dayFormat);

  const day = splittedOldDate[indexForDay];
  const month = splittedOldDate[indexForMounth];
  const year = splittedOldDate[indexYY];
  const SEPARATOR_INDEX = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === dayFormat) {
      newFormatDate.push(day);
    }

    if (toFormat[i] === monthFormat) {
      newFormatDate.push(month);
    }

    if (toFormat[i] === yearFormatYY || toFormat[i] === yearFormatYYYY) {
      const yearUpdate = getPrefixYear(year, toFormat);

      newFormatDate.push(yearUpdate);
    }
  }

  return newFormatDate.join(SEPARATOR_INDEX);
}

module.exports = formatDate;
