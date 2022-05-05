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
  const toSeperator = toFormat[toFormat.length - 1];
  const fromSeperator = fromFormat[fromFormat - 1];
  const dateArray = date.split(fromSeperator);
  let dateYear, dateMonth, dateDay;
  const dateOutput = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      dateYear = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      dateMonth = dateArray[i];
    }

    if (fromFormat[i] === 'DD') {
      dateDay = dateArray[i];
    }
  }

  if (dateYear.length === 2) {
    if (parseInt(dateYear) < 30) {
      dateYear = `20${dateYear}`;
    } else {
      dateYear = `19${dateYear}`;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      dateOutput[dateOutput.length] = dateYear;
    }

    if (toFormat[i] === 'YY') {
      dateOutput[dateOutput.length] = dateYear.slice(2);
    }

    if (toFormat[i] === 'MM') {
      dateOutput[dateOutput.length] = dateMonth;
    }

    if (toFormat[i] === 'DD') {
      dateOutput[dateOutput.length] = dateDay;
    }
  }

  return dateOutput.join(toSeperator);
}

module.exports = formatDate;
