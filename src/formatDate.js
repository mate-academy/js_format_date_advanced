'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine of changing the
 * date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `
 * fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `to
 * Format` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/
 * ']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/
 * ']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const dateArr = date.split(fromFormat[3]);
  const newDateObj = new Date(date);

  const dateObj = {
    MM: '',
    DD: '',
    YYYY: newDateObj.getFullYear() + '',

    get YY() {
      return this.YYYY.slice((2));
    },
  };

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD' : dateObj.DD = dateArr[i]; break;
      case 'MM' : dateObj.MM = dateArr[i]; break;
    }
  }

  for (const key of toFormat) {
    if (dateObj.hasOwnProperty(key)) {
      result.push(dateObj[key]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
