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
  const dateViewInObject = getCurrentDayMonthYear(date, fromFormat);

  const newSeparator = toFormat[toFormat.length - 1];
  const newDateViewInArray = [];

  for (let j = 0; j < toFormat.length - 1; j++) {
    const format = toFormat[j];

    if (format === 'DD') {
      if (dateViewInObject.day.toString().length < 2) {
        dateViewInObject.day = '0' + dateViewInObject.day.toString();
      }

      newDateViewInArray.push(dateViewInObject.day);
    }

    if (format === 'MM') {
      if (dateViewInObject.month.toString().length < 2) {
        dateViewInObject.month = '0' + dateViewInObject.month.toString();
      }

      newDateViewInArray.push(dateViewInObject.month);
    }

    if (format === 'YYYY') {
      if (dateViewInObject.year.toString().length === 4) {
        newDateViewInArray.push(dateViewInObject.year);
        continue;
      }

      if (dateViewInObject.year < 30) {
        dateViewInObject.year += 2000;
        newDateViewInArray.push(dateViewInObject.year);
        continue;
      }

      if (dateViewInObject.year >= 30) {
        dateViewInObject.year += 1900;
        newDateViewInArray.push(dateViewInObject.year);
      }
    }

    if (format === 'YY') {
      if (dateViewInObject.year.toString().length === 4) {
        newDateViewInArray.push(dateViewInObject.year.toString().slice(2));
        continue;
      }

      newDateViewInArray.push(dateViewInObject.year);
    }
  }

  return newDateViewInArray.join(newSeparator);
}

function getCurrentDayMonthYear(date, format) {
  const separator = format[format.length - 1];
  const dateViewInArray = date.split(separator);

  const dateViewInObject = {
    day: 0,
    month: 0,
    year: 0,
  };

  for (let i = 0; i < format.length - 1; i++) {
    const writing = format[i];
    const amount = +dateViewInArray[i];

    if (writing === 'YY' || writing === 'YYYY') {
      dateViewInObject.year = amount;
    }

    if (writing === 'DD') {
      dateViewInObject.day = amount;
    }

    if (writing === 'MM') {
      dateViewInObject.month = amount;
    }
  }

  return dateViewInObject;
}

module.exports = formatDate;
