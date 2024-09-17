'use strict';

/**
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
  const CENTURY_UP = '20';
  const CENTURY_DOWN = '19';
  const CENTURY_BORDER = 99;
  const SWITCH_YEAR = 30;

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

    if (number > CENTURY_BORDER) {
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

    if (number <= CENTURY_BORDER) {
      number = number >= SWITCH_YEAR
        ? CENTURY_DOWN + number
        : CENTURY_UP + number;
    }
    res.push(number);
  }

  return result.join(NEW_DIVIDER);
}

module.exports = formatDate;
