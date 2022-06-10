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
  const fromSeperator = fromFormat[3];
  const toSeperator = toFormat[3];
  const dateSplit = date.split(fromSeperator);

  const dateObject = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateSplit[i];
  }

  // assign appriopriate data to a new date
  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];
    let formatValue = dateObject[format];

    // check if we need to convert year length
    if (!dateObject.hasOwnProperty(format)) {
      const year = dateObject.YY || dateObject.YYYY;

      formatValue = convertYear(year);
    }

    newDate[i] = formatValue;
  }

  return newDate.join(toSeperator);
}

function convertYear(year) {
  let newYear = year;

  if (year.length === 4) {
    // YYYY => YY
    newYear = newYear.charAt(2) + newYear.charAt(3);
  }

  if (year.length === 2) {
    // check is it before 2000 or after
    const thousands = year >= 30 ? 19 : 20;

    //  YY => YYYY
    newYear = thousands + newYear;
  }

  return newYear;
}

module.exports = formatDate;
