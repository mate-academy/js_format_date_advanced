'use strict';

/**
 * Time flies, standards change. Let's get rid of the
 *  routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date`
 *  string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function
 *  returns given date in `toFormat` format.
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
  const fromSeparator = fromFormat[3];
  const fromDate = date.split(`${fromSeparator}`);
  const toDate = [];
  const fromObj = {};
  const toSeparator = toFormat[3];

  for (let i = 0; i < fromDate.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        fromObj['YYYY'] = fromDate[i];
        fromObj['YY'] = fromDate[i].slice(-2);
        break;
      case 'YY':
        fromObj['YY'] = fromDate[i];

        if (fromObj['YY'] < 20) {
          fromDate[i] = +fromDate[i] + 2000;
          fromObj['YYYY'] = fromDate[i];
        } else {
          fromDate[i] = +fromDate[i] + 1900;
          fromObj['YYYY'] = fromDate[i];
        }
        break;
      default:
        fromObj[`${fromFormat[i]}`] = fromDate[i];
    }
  }

  for (const item of toFormat) {
    switch (item) {
      case 'YYYY':
        toDate.push(fromObj['YYYY']);
        break;
      case 'YY':
        toDate.push(fromObj['YY']);
        break;
      case 'MM':
        toDate.push(fromObj['MM']);
        break;
      case 'DD':
        toDate.push(fromObj['DD']);
        break;
      default:
        break;
    }
  }

  return toDate.join(`${toSeparator}`);
}

module.exports = formatDate;
