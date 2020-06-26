'use strict';

/**
 * Time flies, standards change. Let's get rid
 * of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
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
  let newDate = [];
  let index = 0;
  let year = '';
  const seperator = toFormat[toFormat.length - 1];
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if ((fromFormat[i] === 'YYYY') || (fromFormat[i] === 'YY')) {
      year = splitDate[i];
    }

    index = fromFormat.indexOf(toFormat[i]);

    if (index === -1) {
      if (toFormat[i] === 'YY') {
        year = year.split('');
        year = year.slice(2);
        year = year.join('');

        newDate.push(year);
        break;
      }
    }
    newDate.push(splitDate[index]);
  }

  newDate = newDate.join(seperator);

  return newDate;
}

module.exports = formatDate;
