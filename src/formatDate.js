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
  // get marks format
  const fromMark = fromFormat[3];
  const toMark = toFormat[3];
  // ---------------------- //

  const dateArr = date.split(`${fromMark}`);

  // ------from format
  const fullYearIndex = fromFormat.indexOf('YYYY');
  const halfYearIndex = fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');
  // ---------------------- //

  // get dates
  const month = dateArr[monthIndex];
  const day = dateArr[dayIndex];
  let year;
  // ---------------------- //

  for (const getYear of fromFormat) {
    if (getYear === 'YYYY') {
      year = dateArr[fullYearIndex];
    }

    if (getYear === 'YY') {
      year = dateArr[halfYearIndex];
    }
  }

  // ------to format
  const dateResalt = [];
  const getArrYear = year.split('');

  for (const typeDate of toFormat) {
    switch (typeDate) {
      case 'DD':
        dateResalt.push(day);
        break;

      case 'MM':
        dateResalt.push(month);
        break;

      case 'YYYY':
        Number(getArrYear[0]) === 9
          ? dateResalt.push(`19${year}`)
          : dateResalt.push(year);
        break;

      case 'YY':
        dateResalt.push(year.slice(2));
        break;
    }
  }

  return dateResalt.join(`${toMark}`);
}

module.exports = formatDate;
