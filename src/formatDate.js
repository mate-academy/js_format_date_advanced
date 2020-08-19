'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `toFormat` format.
 * 
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const currentDate = date.split(fromFormat[3]);
  const newFormat = ['', '', ''];
  const yearFormat = (fromFormat.includes('YY'))
    ? currentDate[fromFormat.indexOf('YY')]
    : currentDate[fromFormat.indexOf('YYYY')];

  newFormat[toFormat.indexOf('DD')] = currentDate[fromFormat.indexOf('DD')];
  newFormat[toFormat.indexOf('MM')] = currentDate[fromFormat.indexOf('MM')];

  for (let i = 0; i < currentDate.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (yearFormat.length === 2 && yearFormat <= 21) {
          newFormat[toFormat.indexOf('YYYY')] = '20' + yearFormat;
        } else if (yearFormat.length === 2) {
          newFormat[toFormat.indexOf('YYYY')]
            = '19' + yearFormat;
        } else {
          newFormat[toFormat.indexOf('YYYY')]
            = yearFormat;
        }
        break;

      case 'YY':
        newFormat[toFormat.indexOf('YY')]
          = yearFormat.slice(-2);
        break;
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
