'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeperator = fromFormat[fromFormat.length - 1];
  const newSeperator = toFormat[toFormat.length - 1];
  const arrFrom = date.split(oldSeperator);
  const arrTo = [];
  const formats = {
    dayFormat: 'DD',
    monthFormat: 'MM',
    yearFormat: {
      two: 'YY',
      four: 'YYYY',
    },
  };
  const data = {
    days: 0,
    monthes: 0,
    years: 0,
  };
  let result = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === formats.yearFormat.two
      || fromFormat[i] === formats.yearFormat.four) {
      data.years = arrFrom[i];
    }

    if (fromFormat[i] === formats.monthFormat) {
      data.monthes = arrFrom[i];
    }

    if (fromFormat[i] === formats.dayFormat) {
      data.days = arrFrom[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === formats.yearFormat.four && data.years.length === 2) {
      arrTo[i] = data.years < 30
        ? +`20${data.years}`
        : +`19${data.years}`;
    }

    if (toFormat[i] === formats.yearFormat.four && data.years.length === 4) {
      arrTo[i] = data.years;
    }

    if (toFormat[i] === formats.yearFormat.two && data.years.length === 4) {
      arrTo[i] = +String(data.years).slice(-2);
    }

    if (toFormat[i] === formats.monthFormat) {
      arrTo[i] = data.monthes;
    }

    if (toFormat[i] === formats.dayFormat) {
      arrTo[i] = data.days;
    }
  }

  result = arrTo.join(newSeperator);

  return result;
}

module.exports = formatDate;
