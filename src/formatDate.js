'use strict';

/**
 * Time flies, standards change. Let's get rid of the
 * routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts
 * the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'],
 * ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'],
 * ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'],
 * ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[fromFormat.length - 1]);
  let year;
  let month;
  let day;
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = arrDate[i];
        break;
      case 'MM':
        month = arrDate[i];
        break;
      case 'DD':
        day = arrDate[i];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        year = year.split('').splice(2).join('');
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (year > 14) {
          year = `19${year}`;
        } else {
          year = `20${year}`;
        }
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        newDate.push(year);
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'DD':
        newDate.push(day);
        break;
      default:
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
