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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(oldSeparator);

  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let formatElement = fromFormat[i];
    let dateElement = dateParts[i];

    if (formatElement === 'YY') {
      formatElement = 'YYYY';

      if (Number(dateElement) < 30) {
        dateElement = `20${dateElement}`;
      } else {
        dateElement = `19${dateElement}`;
      }
    }
    dateObj[formatElement] = dateElement;
  }

  const separator = toFormat[toFormat.length - 1];
  let newDateFormat = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i > 0) {
      newDateFormat += separator;
    }

    if (toFormat[i] === 'YY') {
      newDateFormat += dateObj['YYYY'].slice(2);
    } else {
      newDateFormat += dateObj[toFormat[i]];
    }
  }

  return newDateFormat;
}

module.exports = formatDate;
