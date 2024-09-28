'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(/\D+/);
  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const formatPart = toFormat[i];
    const fromIndex = fromFormat.indexOf(formatPart);

    if (fromIndex !== -1) {
      formattedDateParts.push(dateParts[fromIndex]);
    } else {
      formattedDateParts.push(formatPart);
    }
  }

  return formattedDateParts.join('');
}

module.exports = formatDate;
