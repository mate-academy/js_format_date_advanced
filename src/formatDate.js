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
  const separatorFromFormat = fromFormat[3];
  const separatorToFormat = toFormat[3];
  const dateArray = date.split(separatorFromFormat);
  const dateTransform = {};
  const dateToFormat = [];
  const shortYear = 'YY';
  const longYear = 'YYYY';

  for (let i = 0; i < dateArray.length; i++) {
    const datePartFrom = fromFormat[i];

    dateTransform[datePartFrom] = dateArray[i];
  }

  if (dateTransform[shortYear]) {
    transformToLongFormat(shortYear, longYear, dateTransform);
  }

  if (dateTransform[longYear]) {
    transformToShortFormat(shortYear, longYear, dateTransform);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const datePartTo = toFormat[i];

    dateToFormat[i] = dateTransform[datePartTo];
  }

  return dateToFormat.join(separatorToFormat);
}

function transformToShortFormat(short, long, date) {
  date[short] = date[long][2] + date[long][3];
}

function transformToLongFormat(short, long, date) {
  if (date[short] < 30) {
    date[long] = '20' + date[short];
  } else {
    date[long] = '19' + date[short];
  }
}

module.exports = formatDate;
