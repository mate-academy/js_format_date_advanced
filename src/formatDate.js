'use strict';

/**
 * Time flies, standards change. Let's get rid of
 *  the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the
 * `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function
 * returns given date in `toFormat` format.
 *
 * Example:
 * formatDate(
 *  '2020-02-18',
 *  ['YYYY', 'MM', 'DD', '-'],
 *  ['DD', 'MM', 'YY', '/']
 * ) // '18/02/20'
 *
 * formatDate(
 *    '2021-02-18',
 *    ['YYYY', 'MM', 'DD', '-'],
 *    ['DD', 'MM', 'YY', '/']
 *  ) // '18/02/21'
 *
 * formatDate(
 *    '97/02/18',
 *    ['YY', 'MM', 'DD', '/'],
      ['DD', 'MM', 'YYYY', '.']
    ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateResalt = [];
  const dateArr = date.split(fromFormat[3]);

  // from format
  let month;
  let day;
  let year;

  for (const element in fromFormat) {
    if (fromFormat[element] === 'DD') {
      day = dateArr[element];
    }

    if (fromFormat[element] === 'MM') {
      month = dateArr[element];
    }

    if (fromFormat[element] === 'YYYY' || fromFormat[element] === 'YY') {
      year = dateArr[element];
    }
  }

  // ------to format
  const toYear = toFormat[2];

  for (const typeDate of toFormat) {
    switch (typeDate[0]) {
      case 'D':
        dateResalt.push(day);
        break;

      case 'M':
        dateResalt.push(month);
        break;

      case 'Y':
        if (toYear.length === 4) {
          dateResalt.push(year);
        } else if (toYear.length === 2) {
          dateResalt.push(year.slice(2));
        }
        break;
    }
  }

  return dateResalt.join(toFormat[3]);
}

module.exports = formatDate;
