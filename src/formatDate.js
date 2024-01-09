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
  const oldFormatDelimiter = getDateDelimiter(fromFormat);
  const newFormatDelimiter = getDateDelimiter(toFormat);
  const oldDateArray = date.split(oldFormatDelimiter);
  const newDateArray = [];

  const dateObj = {
    get year() {
      return this.YY || this.YYYY;
    },
  };

  for (let i = 0; i < oldDateArray.length; i++) {
    dateObj[fromFormat[i]] = oldDateArray[i];
  }

  for (let i = 0; i < oldDateArray.length; i++) {
    const dateKey = toFormat[i];
    const dateValue = dateObj[dateKey];
    const hasCorrectYearFormat = Object.prototype.hasOwnProperty
      .call(dateObj, dateKey);

    if (!hasCorrectYearFormat) {
      const currentYear = dateObj.year;
      const convertedYear = changeYearFormat(dateKey, currentYear);

      newDateArray.push(convertedYear);
    } else {
      newDateArray.push(dateValue);
    }
  }

  return newDateArray.join(newFormatDelimiter);
}

function getDateDelimiter(dateFormat) {
  return dateFormat.splice(dateFormat.length - 1).join('');
}

function changeYearFormat(currentFormat, currentYear) {
  let convertedYear = '';

  switch (currentFormat) {
    case 'YYYY':
      convertedYear = currentYear < 30
        ? `20${currentYear}`
        : `19${currentYear}`;
      break;

    case 'YY':
      convertedYear = currentYear.split('').splice(2).join('');
      break;
  }

  return convertedYear;
}

module.exports = formatDate;
