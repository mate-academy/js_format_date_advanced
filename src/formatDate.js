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
  const arrDate = date.split(fromFormat[3]);
  const arrResult = Array(3);
  const arrLetterDate = [['YY', 'YYYY'], ['DD'], ['MM']];

  for (let i = 0; i < arrDate.length; i++) {
    let indexTo = toFormat.indexOf(arrLetterDate[i][0]);

    if (indexTo === -1) {
      indexTo = toFormat.indexOf(arrLetterDate[i][1]);
    }

    let indexFrom = fromFormat.indexOf(arrLetterDate[i][0]);

    if (indexFrom === -1) {
      indexFrom = fromFormat.indexOf(arrLetterDate[i][1]);
    }

    switch(toFormat[indexTo]) {
      case 'YY':
        if (fromFormat[indexFrom] === 'YYYY') {
          arrResult[indexTo] = arrDate[indexFrom].slice(2);
          continue;
        }
        break;

      case 'YYYY':
        if (fromFormat[indexFrom] === 'YY') {
          if (+arrDate[indexFrom][0] <  3) {
            arrResult[indexTo] = '20' + arrDate[indexFrom];
          } else {
            arrResult[indexTo] = '19' + arrDate[indexFrom];
          }
        } else {
          arrResult[indexTo] = arrDate[indexFrom];
        }
        break;

      default:
        arrResult[indexTo] = arrDate[indexFrom];
    }
  }

  return arrResult.join(toFormat[3]);
}

module.exports = formatDate;
