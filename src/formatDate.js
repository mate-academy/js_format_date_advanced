'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateParts = date.split(fromSeparator);
  const mapping = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        mapping.YYYY = dateParts[i];
        mapping.YY = dateParts[i].slice(-2);
        break;

      case 'YY':
        mapping.YY = dateParts[i];

        mapping.YYYY =
          dateParts[i] < 30 ? `20${dateParts[i]}` : `19${dateParts[i]}`;
        break;

      case 'MM':
        mapping.MM = dateParts[i];
        break;

      case 'DD':
        mapping.DD = dateParts[i];
        break;
    }
  }

  let result = '';

  for (let i = 0; i < toFormat.length; i++) {
    result += mapping[toFormat[i]];

    if (i < toFormat.length - 1) {
      result += toSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
