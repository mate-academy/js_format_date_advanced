'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Split the input date into parts
  const parts = date.split(fromFormat[3]);
  const dateParts = {};

  // Map the date parts based on the fromFormat
  fromFormat.forEach((part, index) => {
    dateParts[part] = parts[index];
  });

  // Prepare toFormat
  const formattedDate = toFormat.map((format, index) => {
    if (format === 'YY' && dateParts['YYYY']) {
      // Convert 'YYYY' to 'YY'
      return dateParts['YYYY'].slice(2); // Take the last two digits
    }

    if (format === 'YYYY' && dateParts['YY']) {
      // Convert 'YY' to 'YYYY'
      const year = parseInt(dateParts['YY']);

      return year < 30 ? `20${dateParts['YY']}` : `19${dateParts['YY']}`;
    }

    return dateParts[format] || '';
  });

  // Remove the last separator if it exists
  const finalDate = formattedDate.join(toFormat[3]);

  // Ensure no trailing separator is added
  if (finalDate.endsWith(toFormat[3])) {
    return finalDate.slice(0, -1);
  }

  return finalDate;
}

module.exports = formatDate;
