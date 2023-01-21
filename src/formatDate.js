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
  const splitted = date.split(fromFormat[3]);
  const toYearKey = toFormat.includes('YY') ? 'YY' : 'YYYY';
  const formattedDate = {};
  const result = [];

  fromFormat.forEach((element, index) => {
    for (let i = 0; toFormat.length - 1 > i; i++) {
      if (toFormat[i].includes(element[0])) {
        formattedDate[toFormat[i]] = splitted[index];
      }
    }
  });

  const valueOfYearKey = formattedDate[toYearKey];

  if (formattedDate.YYYY && valueOfYearKey.length === 2) {
    formattedDate[toYearKey] = valueOfYearKey < 30
      ? 20 + valueOfYearKey
      : 19 + valueOfYearKey;
  }

  if (formattedDate.YY && valueOfYearKey.length === 4) {
    formattedDate[toYearKey] = valueOfYearKey.slice(-2);
  }

  Object.entries(formattedDate).forEach(([key, value]) => {
    for (let i = 0; toFormat.length - 1 > i; i++) {
      if (key === toFormat[i]) {
        result[i] = value;
      }
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
