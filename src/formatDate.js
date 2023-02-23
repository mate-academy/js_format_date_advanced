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
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateViewInObject = {};

  fromFormat.forEach((format, i) => {
    const amount = +date.split(fromSeparator)[i];

    switch (format) {
      case 'YY':
        dateViewInObject.year = amount < 30
          ? 2000 + amount
          : 1900 + amount;
        break;

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
  });

  const newDateViewInArray = toFormat.map((format) => {
    switch (format) {
      case 'YY':
        const year = dateViewInObject.year % 100;

        return year < 10
          ? `0${year}`
          : `${year}`;

      case 'YYYY':
        return dateViewInObject.year.toString();

      case 'DD':
        const day = dateViewInObject.day < 10
          ? `0${dateViewInObject.day}`
          : `${dateViewInObject.day}`;

        return day;

      case 'MM':
        const month = dateViewInObject.month < 10
          ? `0${dateViewInObject.month}`
          : `${dateViewInObject.month}`;

        return month;
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  });

  return newDateViewInArray.join(toSeparator);
}

module.exports = formatDate;
