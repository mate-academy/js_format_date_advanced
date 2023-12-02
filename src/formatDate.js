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
  const dateObj = { };
  const newDate = [];

  const oldDateFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat[3];
  const oldDateList = date.split(oldSeparator);

  const newSep = toFormat[3];
  const newDateFormat = toFormat.slice(0, 3);

  for (let i = 0; i < oldDateFormat.length; i++) {
    const element = oldDateFormat[i];

    dateObj[element] = oldDateList[i];
  }

  handleYearFormat(dateObj, toFormat);

  for (let i = 0; i < newDateFormat.length; i++) {
    newDate.push(dateObj[toFormat[i]]);
  }

  return newDate.join(newSep);
}

function handleYearFormat(dateObj, toFormat) {
  if ('YY' in dateObj && toFormat.includes('YYYY')) {
    if (dateObj.YY < 30) {
      dateObj.YYYY = `20${dateObj.YY}`;
    } else {
      dateObj.YYYY = `19${dateObj.YY}`;
    }

    delete dateObj.YY;
  }

  if ('YYYY' in dateObj && toFormat.includes('YY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
    delete dateObj.YYYY;
  }
}

module.exports = formatDate;
