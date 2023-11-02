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
  // verifying incoming formats
  if (fromFormat.length !== 4) {
    throw new Error('Incorrect date format (fromFormat).');
  }

  if (toFormat.length !== 4) {
    throw new Error('Incorrect date format (fromFormat).');
  }

  // an object to neatly store all the date values
  const dateInfo = {};

  // separators
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();

  // variable to render the date in the new format
  // based on toFormat argument
  const newDate = [...toFormat];

  // date split into an array
  const dateNumbers = date.split(oldSeparator);

  // verifying incoming date
  if (dateNumbers.length !== 3) {
    throw new Error('Incorrect date.');
  }

  // dateInfo object - creating keys and values with the loop
  for (let i = 0; i < fromFormat.length; i++) {
    // converting year from 'YY' to 'YYYY' if needed
    if (fromFormat[i] === 'YY') {
      const prefix = +dateNumbers[i] < 30 ? '20' : '19';

      dateInfo['YYYY'] = prefix + dateNumbers[i];

      continue;
    }

    dateInfo[fromFormat[i]] = dateNumbers[i];
  }

  // newDate - filling in the data
  for (let i = 0; i < newDate.length; i++) {
    // converting year from 'YYYY' to 'YY' if needed
    if (newDate[i] === 'YY') {
      newDate[i] = dateInfo['YYYY'].substring(2);

      continue;
    }

    newDate[i] = dateInfo[newDate[i]];
  }

  // returning newDate joint with newSeparator
  return newDate.join(newSeparator);
}

formatDate(
  '2012-12-21',
  ['YYYY', 'MM', 'DD', '-'],
  ['DD', 'MM', 'YY', '/'],
);

module.exports = formatDate;
