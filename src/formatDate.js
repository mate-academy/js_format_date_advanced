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
  const fromDateSeparator = fromFormat[3];
  const toDateSeparator = toFormat[3];
  const yearsMap = {};
  let formatMap = {};
  const dateParts = date.split(fromDateSeparator);
  const formatedDate = [];

  const getFullYear = (year) => {
    if (+year < 30) {
      return `20${year}`;
    }

    return `19${year}`;
  };

  const getShortYear = (year) => {
    return year.slice(2);
  };

  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat[i] === 'YY') {
      yearsMap['YY'] = dateParts[i];
      yearsMap['YYYY'] = getFullYear(dateParts[i]);
    }

    if (fromFormat[i] === 'YYYY') {
      yearsMap['YYYY'] = dateParts[i];
      yearsMap['YY'] = getShortYear(dateParts[i]);
    }

    formatMap[fromFormat[i]] = dateParts[i];
  }

  formatMap = {
    ...formatMap,
    ...yearsMap,
  };

  for (let i = 0; i < dateParts.length; i++) {
    const dateToPart = formatMap[toFormat[i]];

    formatedDate.push(dateToPart);
  }

  return formatedDate.join(toDateSeparator);
}

module.exports = formatDate;
