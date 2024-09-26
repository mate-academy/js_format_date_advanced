'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (typeof date !== 'string') {
    throw new Error('Invalid date type. Expect a string');
  }

  if (!Array.isArray(fromFormat)) {
    throw new Error('Invalid fromFormat type. Expect string[]');
  }

  if (!Array.isArray(toFormat)) {
    throw new Error('Invalid toFormat type. Expect string[]');
  }

  if (fromFormat.length !== 4) {
    throw new Error('fromFormat has to contain 4 elements');
  }

  if (toFormat.length !== 4) {
    throw new Error('toFormat has to contain 4 elements');
  }

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const regex = new RegExp(`\\${oldSeparator}`, 'g');

  if (!date.includes(oldSeparator) || date.match(regex).length !== 2) {
    throw new Error(`Date has to be divided by ${oldSeparator}`);
  }

  const dateParts = date.split(oldSeparator);
  let year = '';
  let month = '';
  let day = '';
  const formatDateParts = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
      default:
        throw new Error(
          `${fromFormat[i]} is not correct for fromFormat. Expected 'YY'/ 'YYYY', 'MM' or 'DD' `,
        );
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        formatDateParts.push(getFormatYear(year, toFormat[i]));
        break;
      case 'MM':
        formatDateParts.push(month);
        break;
      case 'DD':
        formatDateParts.push(day);
        break;
      default:
        throw new Error(
          `${toFormat[i]} is not correct for toFormat. Expected 'YY'/ 'YYYY', 'MM' or 'DD' `,
        );
    }
  }

  return formatDateParts.join(newSeparator);
}

/**
 * @param {string} year
 * @param {string} formatYear
 *
 * @returns {string}
 */

function getFormatYear(year, formatYear) {
  if (formatYear.length === 2) {
    return year.slice(-2);
  }

  if (year.length === 2 && +year < 30) {
    return `20${year}`;
  }

  if (year.length === 2 && +year >= 30) {
    return `19${year}`;
  }

  return year;
}

module.exports = formatDate;
