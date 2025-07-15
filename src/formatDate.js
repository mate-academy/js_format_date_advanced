'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const indexOfDayFrom = fromFormat.indexOf('DD');
  const indexOfDayTo = toFormat.indexOf('DD');

  const indexOfMonthFrom = fromFormat.indexOf('MM');
  const indexOfMonthTo = toFormat.indexOf('MM');

  let indexOfYearFrom;
  let indexOfYearTo;

  if (fromFormat.includes('YY')) {
    indexOfYearFrom = fromFormat.indexOf('YY');
  } else {
    indexOfYearFrom = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YY')) {
    indexOfYearTo = toFormat.indexOf('YY');
  } else {
    indexOfYearTo = toFormat.indexOf('YYYY');
  }

  const dateArr = date.split(fromFormat[3]);

  if (fromFormat[indexOfYearFrom] !== toFormat[indexOfYearTo]) {
    if (dateArr[indexOfYearFrom].length === 2) {
      if (dateArr[indexOfYearFrom] < 30) {
        dateArr[indexOfYearFrom] = 20 + dateArr[indexOfYearFrom];
      } else {
        dateArr[indexOfYearFrom] = 19 + dateArr[indexOfYearFrom];
      }
    } else {
      dateArr[indexOfYearFrom] = dateArr[indexOfYearFrom].slice(2);
    }
  }

  const newDateArr = [];

  newDateArr[indexOfDayTo] = dateArr[indexOfDayFrom];
  newDateArr[indexOfMonthTo] = dateArr[indexOfMonthFrom];
  newDateArr[indexOfYearTo] = dateArr[indexOfYearFrom];

  const result = newDateArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
