'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const toSeparator = toFormat.pop();
  const fromSeparator = fromFormat.pop();

  const fromDateParts = date.split(fromSeparator);
  const toDate = [];

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = fromDateParts[i];
        break;

      case 'YY':
        year = (fromDateParts[i] < 30 ? '20' : '19') + fromDateParts[i];
        break;

      case 'MM':
        month = fromDateParts[i];
        break;

      case 'DD':
        day = fromDateParts[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        toDate.push(year);
        break;

      case 'YY':
        toDate.push(year.slice(-2));
        break;

      case 'MM':
        toDate.push(month);
        break;

      case 'DD':
        toDate.push(day);
        break;

      default:
        break;
    }
  }

  return toDate.join(toSeparator);
}

module.exports = formatDate;
