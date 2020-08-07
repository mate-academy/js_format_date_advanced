'use strict';

/**
 * Time flies, standards change. Let's get rid of the
 * routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the
 * `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
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
  const resultArr = [];
  const dateArr = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case `DD`:
        resultArr.push(dateArr[fromFormat.indexOf(`DD`)]);
        break;

      case `MM`:
        resultArr.push(dateArr[fromFormat.indexOf(`MM`)]);
        break;

      case `YY`:

        if (fromFormat.indexOf(`YY`) !== -1) {
          resultArr.push(dateArr[fromFormat.indexOf(`YY`)]);
        } else {
          resultArr.push(dateArr[fromFormat.indexOf(`YYYY`)].slice(2));
        }

        break;

      case `YYYY`:

        if (fromFormat.indexOf(`YYYY`) !== -1) {
          resultArr.push(dateArr[fromFormat.indexOf(`YYYY`)]);
        } else {
          if (dateArr[fromFormat.indexOf(`YY`)][0] > 2) {
            resultArr.push(`19` + dateArr[fromFormat.indexOf(`YY`)]);
          } else {
            resultArr.push(`20` + dateArr[fromFormat.indexOf(`YY`)]);
          }
        }
    }
  }

  return resultArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
