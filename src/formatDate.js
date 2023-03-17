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
  const dateObject = {
    inSepar: fromFormat[fromFormat.length - 1],
    outSepar: toFormat[toFormat.length - 1],

    modifyYear() {
      if (this.year.length === 4) {
        this.year = this.year.slice(2);

        return;
      }

      if (this.year < 30) {
        this.year = '20' + this.year;

        return;
      }

      this.year = '19' + this.year;
    },
  };

  const originDate = date.split(dateObject.inSepar);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        dateObject.year = originDate[i];
        break;

      case 'M':
        dateObject.month = originDate[i];
        break;

      case 'D':
        dateObject.day = originDate[i];
        break;

      default:
        throw new Error('error');
    }
  }

  const modifiedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i][0]) {
      case 'Y':
        if (toFormat[i].length !== dateObject.year.length) {
          dateObject.modifyYear();
        };

        modifiedDate.push(dateObject.year);
        break;

      case 'M':
        modifiedDate.push(dateObject.month);
        break;

      case 'D':
        modifiedDate.push(dateObject.day);
        break;

      default:
        throw new Error('error');
    }
  }

  return modifiedDate.join(dateObject.outSepar);
}

module.exports = formatDate;
