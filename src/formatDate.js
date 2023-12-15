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
  // write code here
  const dividerIndex = toFormat.length - 1;
  const NEW_DIVIDER = toFormat[dividerIndex];

  const result = [];
  const dateCopy = date.split(fromFormat[dividerIndex]);

  for (const datePart of toFormat) {
    switch (datePart) {
      case 'YY':
        addYearShortFormat('YY', result);
        break;

      case 'YYYY':
        addYearLongFormat('YYYY', result);
        break;

      case 'DD':
        addDateElement('DD', result);
        break;

      case 'MM':
        addDateElement('MM', result);
        break;

      default: break;
    }
  }

  // add function above to format dd mm
  function addDateElement(value, res) {
    const index = fromFormat.indexOf(value);
    const number = dateCopy[index];

    res.push(number);
  }

  // add function to year format YY
  function addYearShortFormat(value, res) {
    let index = fromFormat.indexOf('YY');

    if (index < 0) {
      index = fromFormat.indexOf('YYYY');
    }

    let number = dateCopy[index];

    if (number > 99) {
      number = number % 100;
    }
    res.push(number);
  }

  // add function to year format YYYY
  function addYearLongFormat(value, res) {
    let index = fromFormat.indexOf('YY');

    if (index < 0) {
      index = fromFormat.indexOf('YYYY');
    }

    let number = dateCopy[index];

    if (number <= 99) {
      number = number >= 30 ? '19' + number : '20' + number;
    }
    res.push(number);
  }

  return result.join(NEW_DIVIDER);
}

module.exports = formatDate;
