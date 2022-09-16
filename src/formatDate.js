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
  const oldDivider = fromFormat[3];
  const newDivider = toFormat[3];
  const oldDate = date.split(oldDivider);
  const oldDateFormat = fromFormat.slice(0, -1);
  const newDateFormat = toFormat.slice(0, -1);
  const oldDateObject = { normalize: toNormalizeDate };
  const newDate = [];

  for (let i = 0; i < oldDate.length; i++) {
    oldDateObject[oldDateFormat[i]] = oldDate[i];
  }

  oldDateObject.normalize(newDateFormat);

  for (const time of newDateFormat) {
    newDate.push(oldDateObject[time]);
  }

  return newDate.join(newDivider);
}

function toNormalizeDate(newDateFormat) {
  if (this.hasOwnProperty('YY') && newDateFormat.includes('YYYY')) {
    this.YYYY = this.YY;

    if (+this.YY > 22) {
      this.YYYY = this.YYYY.padStart(4, '19');
    } else {
      this.YYYY = this.YYYY.padStart(4, '20');
    }

    delete this.YY;
  }

  if (this.hasOwnProperty('YYYY') && newDateFormat.includes('YY')) {
    this.YY = this.YYYY;

    this.YY = this.YY.slice(2);

    delete this.YYYY;
  }

  return this;
}

module.exports = formatDate;
