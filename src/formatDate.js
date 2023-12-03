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
  // write code here
  // const [year, month, day] = date.split('');
  let year = '';
  let month = '';
  let day = '';
  const separator = fromFormat[3];

  const findIndex = (dateFormat) => {
    const dayIndex = dateFormat.indexOf('DD');
    const monthIndex = dateFormat.indexOf('MM');
    const yearIndex1 = dateFormat.indexOf('YY');
    const yearIndex2 = dateFormat.indexOf('YYYY');
    const yearIndex = yearIndex1 === -1 ? yearIndex2 : yearIndex1;
    const yearLength = yearIndex1 === -1 ? 4 : 2;

    return [dayIndex, monthIndex, yearIndex, yearLength];
  };

  const indexFromFormat = findIndex(fromFormat);
  const indexToFormat = findIndex(toFormat);

  const dateArray = date.split(separator);

  day = dateArray[indexFromFormat[0]];
  month = dateArray[indexFromFormat[1]];
  year = dateArray[indexFromFormat[2]];

  if (indexFromFormat[3] === 4 && indexToFormat[3] === 2) {
    year = year.slice(2, 4);
  }

  if (indexFromFormat[3] === 2 && indexToFormat[3] === 4) {
    year = Number(year) < 30 ? '20' + year : '19' + year;
  }

  const dmyArray = [day, month, year];
  const resultArray = [dmyArray[indexToFormat.indexOf(0)],
    dmyArray[indexToFormat.indexOf(1)],
    dmyArray[indexToFormat.indexOf(2)]];

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
