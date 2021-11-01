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
  const separator = fromFormat[fromFormat.length - 1];
  const joiner = toFormat[toFormat.length - 1];
  const splitedDate = date.split(separator);
  const dateFromFormat = getDateFromFormat(splitedDate, fromFormat);
  const formatedDate = setDateToFormat(dateFromFormat, toFormat);

  return formatedDate.join(joiner);
}

function getDateFromFormat(date, format) {
  const datesMapping = {};

  for (let i = 0; i < format.length - 1; i += 1) {
    datesMapping[format[i]] = date[i];
  }

  return datesMapping;
}

function setDateToFormat(date, format) {
  const datesMapping = {};

  for (let i = 0; i < format.length; i += 1) {
    switch (format[i]) {
      case 'DD': {
        datesMapping[format[i]] = date[format[i]];
        continue;
      }

      case 'MM': {
        datesMapping[format[i]] = date[format[i]];
        continue;
      }

      case 'YY': {
        datesMapping[format[i]] = date['YY'] || date['YYYY'].slice(-2);
        continue;
      }

      case 'YYYY': {
        datesMapping[format[i]] = date['YYYY'] || getProperCentury(date['YY']);
        continue;
      }
    }
  }

  return format.slice(0, -1).map(element => datesMapping[element]);
}

function getProperCentury(centuryDate) {
  const isSmaller30 = Number(centuryDate) < 30;

  const prefix = isSmaller30 ? '20' : '19';

  return prefix + centuryDate;
}

module.exports = formatDate;
