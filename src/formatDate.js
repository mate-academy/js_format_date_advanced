'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
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
  const dateArr = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < dateArr.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate[i] = dateArr[fromFormat.indexOf('DD')];
        break;

      case 'MM':
        newDate[i] = dateArr[fromFormat.indexOf('MM')];
        break;

      case 'YY':
        if (fromFormat.indexOf('YY') === -1) {
          newDate[i] = dateArr[fromFormat.indexOf('YYYY')];
          newDate[i] = newDate[i].slice(2);
        } else {
          newDate[i] = dateArr[fromFormat.indexOf('YY')];
        }
        break;

      case 'YYYY':
        if (fromFormat.indexOf('YYYY') === -1) {
          const year = dateArr[fromFormat.indexOf(`YY`)];

          if (year > 20) {
            newDate[i] = [`19` + year];
          } else {
            newDate[i] = [`20` + year];
          }
        } else {
          newDate[i] = dateArr[fromFormat.indexOf('YYYY')];
        }
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
