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

function formatYear(year, fromFormat, toFormat) {
  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    return year.slice(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }

  return year;
}

function formatDate(date, fromFormat, toFormat) {
  const formattedDateArr = [];
  let formattedYear;
  let day;
  let month;
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < dateParts.length; i++) {
    if (i === fromFormat.indexOf('YYYY')) {
      formattedYear = formatYear(dateParts[i], fromFormat, toFormat);
    } else if (i === fromFormat.indexOf('YY')) {
      formattedYear = formatYear(dateParts[i], fromFormat, toFormat);
    } else if (i === fromFormat.indexOf('MM')) {
      month = dateParts[i];
    } else if (i === fromFormat.indexOf('DD')) {
      day = dateParts[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formattedDateArr.push(day);
        break;
      case 'MM':
        formattedDateArr.push(month);
        break;
      default:
        formattedDateArr.push(formattedYear);
        break;
    }
  }

  return formattedDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
