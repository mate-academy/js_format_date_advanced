'use strict';

/*
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
  const newDate = [null, null, null];

  const oldPosition = {
    separator: fromFormat[3],
    dateSlots: 3,

    get date() {
      return fromFormat.indexOf('DD');
    },

    get month() {
      return fromFormat.indexOf('MM');
    },

    get year() {
      return this.dateSlots - this.date - this.month;
    },
  };

  const newPosition = {
    separator: toFormat[3],
    dateSlots: 3,

    get date() {
      return toFormat.indexOf('DD');
    },

    get month() {
      return toFormat.indexOf('MM');
    },

    get year() {
      return this.dateSlots - this.date - this.month;
    },

    get formatYear() {
      if (toFormat[this.year].length > 2) {
        return 'YYYY';
      }

      return 'YY';
    },
  };

  const splitDate = date.split(oldPosition.separator);

  newDate[newPosition.date] = splitDate[oldPosition.date];
  newDate[newPosition.month] = splitDate[oldPosition.month];

  if (newPosition.formatYear === 'YY') {
    newDate[newPosition.year] = getShortYear(splitDate[oldPosition.year]);
  }

  if (newPosition.formatYear === 'YYYY') {
    newDate[newPosition.year] = getFullYear(splitDate[oldPosition.year]);
  }

  return newDate.join(newPosition.separator);
}

function getFullYear(year) {
  if (year.length === 4) {
    return year;
  }

  if (year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

function getShortYear(year) {
  if (year.length === 2) {
    return year;
  }

  return year.slice(2);
}

module.exports = formatDate;
