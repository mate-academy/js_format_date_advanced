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
  const dateArray = date.split(fromFormat[3]);
  const result = [];

  const settingDate = (format, callback) => {
    const data = {};

    for (let i = 0; i < dateArray.length; i++) {
      if (format[i].includes('D')) {
        data.day = callback(i);
      } else if (format[i].includes('Y')) {
        data.year = callback(i);
      } else if (format[i].includes('M')) {
        data.month = callback(i);
      }
    }

    return data;
  };

  const fromFormatCallback = i => dateArray[i];
  const toFormatCallback = i => toFormat[i];

  const fromDate = settingDate(fromFormat, fromFormatCallback);
  const toDateFormat = settingDate(toFormat, toFormatCallback);

  for (const key in toDateFormat) {
    if (fromDate[key].length !== toDateFormat[key].length) {
      if (toDateFormat[key].length < fromDate[key].length) {
        toDateFormat[key] = fromDate[key].substring(2, 4);
      } else if (fromDate[key] < 30) {
        toDateFormat[key] = 20 + fromDate[key];
      } else if (fromDate[key] >= 30) {
        toDateFormat[key] = 19 + fromDate[key];
      }

      result.push(toDateFormat[key]);
    } else {
      result.push(fromDate[key]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
