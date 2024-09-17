'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formattedDate = [];
  let day = 0;
  let month = 0;
  let year = 0;
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[fromFormat.length - 1];
  const splittedParts = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = splittedParts[i];
        break;

      case 'MM':
        month = splittedParts[i];
        break;
      default:
        year = splittedParts[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formattedDate.push(day);
        break;

      case 'MM':
        formattedDate.push(month);
        break;

      case 'YY':
        if (year.length > 2) {
          formattedDate.push(year.slice(2));
        } else {
          formattedDate.push(year);
        }
        break;

      case 'YYYY':
        if (year.length === 2 && year >= 30) {
          formattedDate.push(`19${year}`);
        } else if (year.length === 2 && year < 30) {
          formattedDate.push(`20${year}`);
        } else if (year.length === 4) {
          formattedDate.push(year);
        }
        break;
      default:
        break;
    }
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
