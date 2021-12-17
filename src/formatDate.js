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
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const [ firstPartFrom, secondPartFrom, thirdPartFrom ] = fromFormat;
  const oldDateParts = [firstPartFrom, secondPartFrom, thirdPartFrom].sort();
  const [ firstPartTo, secondPartTo, thirdPartTo ] = toFormat;
  const newDateParts = [firstPartTo, secondPartTo, thirdPartTo].sort();

  let dateObj = {};

  for (let i = 0; i < dateParts.length; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  dateObj = formatYears(dateObj, oldDateParts, newDateParts);

  dateObj[newDateParts[2]] = dateObj[oldDateParts[2]];

  const finalDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    finalDateParts.push(dateObj[toFormat[i]]);
  }

  return finalDateParts.join(toFormat[3]);
}

function formatYears(inputOb, oldParts, newParts) {
  const date = { ...inputOb };

  if (newParts[2].length > oldParts[2].length) {
    if (date[oldParts[2]] < 30) {
      const val = '20' + date[oldParts[2]];

      date[oldParts[2]] = val;
    } else {
      const val = '19' + date[oldParts[2]];

      date[oldParts[2]] = val;
    }
  }

  if (newParts[2].length < oldParts[2].length) {
    date[oldParts[2]] = date[oldParts[2]].slice(-2);
  }

  return date;
}

module.exports = formatDate;
