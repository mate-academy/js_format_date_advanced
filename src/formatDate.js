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
  const dateObject = {
    get YYYY() {
      return this.year;
    },
    set YYYY(year) {
      this.year = year;
    },
    get YY() {
      return this.year.slice(2);
    },
    set YY(year) {
      if (Number.parseInt(year) < 30) {
        this.year = `20${year}`;
      }

      if (Number.parseInt(year) >= 30) {
        this.year = `19${year}`;
      }
    },
    MM: null,
    DD: null,
  };

  const [
    firstUnitFrom,
    secondUnitFrom,
    thirdUnitFrom,
    separatorFrom,
  ] = fromFormat;

  const [
    firstValue,
    secontValue,
    thirdValue,
  ] = date.split(separatorFrom);

  dateObject[firstUnitFrom] = firstValue;
  dateObject[secondUnitFrom] = secontValue;
  dateObject[thirdUnitFrom] = thirdValue;

  const [
    firstUnitTo,
    secondUnitTo,
    thirdUnitTo,
    separatorTo,
  ] = toFormat;

  return [
    dateObject[firstUnitTo],
    dateObject[secondUnitTo],
    dateObject[thirdUnitTo],
  ].join(separatorTo);
}

module.exports = formatDate;
