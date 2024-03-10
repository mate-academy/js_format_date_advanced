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
  const currentDate = determineDate(date, fromFormat);
  const result = [];

  for (const value of toFormat) {
    switch (value) {
      case 'DD': {
        result.push(currentDate['DD']);
        break;
      }

      case 'MM': {
        result.push(currentDate['MM']);
        break;
      }

      case 'YY': {
        const year = formatYear('YY', currentDate.year);

        result.push(year);
        break;
      }

      case 'YYYY': {
        const year = formatYear('YYYY', currentDate.year);

        result.push(year);
        break;
      }
      default:
        break;
    }
  }

  return result.join(getSeparator(toFormat));
}

function determineDate(date, format) {
  const separator = getSeparator(format);
  const numbersFromDate = date.split(separator);
  const dateStructure = {};

  for (let i = 0; i < format.length; i++) {
    switch (format[i]) {
      case 'DD': {
        dateStructure['DD'] = numbersFromDate[i];
        break;
      }

      case 'MM': {
        dateStructure['MM'] = numbersFromDate[i];
        break;
      }

      case 'YY':
        dateStructure.year = numbersFromDate[i];
        break;

      case 'YYYY': {
        dateStructure.year = numbersFromDate[i];
        break;
      }

      default:
        break;
    }
  }

  return dateStructure;
}

function formatYear(value, year) {
  if (value === 'YY') {
    if (year.length > 2) {
      return year.slice(-2);
    }

    return year;
  }

  if (value === 'YYYY') {
    if (year === '00') {
      return 2000;
    }

    if (year.length <= 2) {
      if (year >= 30) {
        return 19 + year;
      } else {
        return 20 + year;
      }
    }

    return year;
  }
}

function getSeparator(format) {
  return format[format.length - 1];
}
module.exports = formatDate;
