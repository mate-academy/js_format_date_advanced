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
  const newDateViewInArray = getDesireFormatDate(dateViewInObject, toFormat);

  return newDateViewInArray.join(newSeparator);
}

function getCurrentDayMonthYear(date, formats) {
  const separator = formats[formats.length - 1];
  const dateViewInArray = date.split(separator);

  const dateViewInObject = {
    day: 0,
    month: 0,
    year: 0,
  };

  for (let i = 0; i < formats.length - 1; i++) {
    const format = formats[i];
    const amount = +dateViewInArray[i];

    switch (format) {
      case 'YY':
      case 'YYYY':
        dateViewInObject.year = amount;
        break;

      case 'DD':
        dateViewInObject.day = amount;
        break;

      case 'MM':
        dateViewInObject.month = amount;
        break;

      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }

  return dateViewInObject;
}

function getDesireFormatDate(date, desireFormat) {
  const newDateViewInArray = [];

  const yearLength = date.year.toString().length;

  for (let j = 0; j < desireFormat.length - 1; j++) {
    const format = desireFormat[j];
    let nextAdding = 0;

    switch (format) {
      case 'DD':
        nextAdding = date.day.toString().length < 2
          ? +date.day.toString().slice(2)
          : date.day;

        break;

      case 'MM':
        nextAdding = date.month.toString().length < 2
          ? date.month.toString().padStart(2, '0')
          : date.month;

        break;

      case 'YYYY':
        nextAdding = getFormatYearFourDigits(date);

        break;

      case 'YY':
        nextAdding = yearLength === 4
          ? date.year.toString().slice(2)
          : date.year;

        break;

      default:
        throw new Error(`Unknown format: ${format}`);
    }

    newDateViewInArray.push(nextAdding);
  }

  return newDateViewInArray;
}

function getFormatYearFourDigits(date) {
  const yearLength = date.year.toString().length;

  switch (yearLength) {
    case 4:
      return date.year;

    case 2:
    case 1:
      date.year += date.year < 30
        ? 2000
        : 1900;

      return date.year;

    default:
      throw new Error(`Unknown length of year date: ${yearLength}`);
  }
}

module.exports = formatDate;
