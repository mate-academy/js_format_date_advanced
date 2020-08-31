'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the
 * `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18',
 * ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18',
 * ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18',
 * ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const arrayOfDate = date.split(fromFormat[3]);
  let year;
  let result;

  for (let q = 0; q < fromFormat.length; q++) {
    if (fromFormat[q] === 'YYYY') {
      year = q;
    }
  }

  for (let w = 0; w < toFormat.length; w++) {
    if (toFormat[w] === 'YY') {
      arrayOfDate[year] = arrayOfDate[year].substring(2);
      fromFormat[year] = 'YY';
    }
  }

  const objectOfFromFormatDate = {};
  const formatToNewDate = [];

  for (let q = 0; q < fromFormat.length - 1; q++) {
    objectOfFromFormatDate[fromFormat[q]] = arrayOfDate[q];
  }

  for (let w = 0; w < toFormat.length - 1; w++) {
    switch (toFormat[w]) {
      case toFormat[w]:
        formatToNewDate[w] = objectOfFromFormatDate[toFormat[w]];
        break;
    }
  }

  // eslint-disable-next-line prefer-const
  result = formatToNewDate.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
