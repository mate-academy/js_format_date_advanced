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
 * formatDate('2020-02-18',
 * ['YYYY', 'MM', 'DD', '-'],
 * ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18',
 * ['YYYY', 'MM', 'DD', '-'],
 *  ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18'
 * ['YY', 'MM', 'DD', '/'],
 * ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(/[^\w]/);

  const reg = /^(19)|(20)/;

  let newDate = [];

  newDate.length = 3;

  for (let i = 0; i < toFormat.length; i++) {
    let index = 0;

    for (let j = 0; j < 4; j++) {
      if (toFormat[i][0] === fromFormat[index][0]) {
        if (toFormat[i].length > dateArray[index].length) {
          if (Number(dateArray[index]) <= 20) {
            dateArray[index] = `20${dateArray[index]}`;
            break;
          } else {
            dateArray[index] = `19${dateArray[index]}`;
            break;
          }
        }

        if (toFormat[i].length < dateArray[index].length) {
          dateArray[index] = dateArray[index].replace(reg, '');
          newDate[i] = dateArray[index];
          break;
        }

        newDate[i] = dateArray[index];
        break;
      }
      index++;
    }
  }

  newDate = newDate.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
