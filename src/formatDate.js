'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // Extract the separator from the fromFormat and toFormat arrays
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  // Split the date using the fromFormat separator
  const dateParts = date.split(fromSeparator);

  // Create an object to map the format parts to their corresponding values
  const dateMap = {};

  fromFormat.forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  // Handle conversion from YY to YYYY and vice versa
  const convertYear = (yearStr, fromType, toType) => {
    if (fromType === 'YYYY' && toType === 'YY') {
      return yearStr.slice(-2);
    } else if (fromType === 'YY' && toType === 'YYYY') {
      const year = parseInt(yearStr, 10);

      return year < 30 ? `20${yearStr.padStart(2, '0')}` : `19${yearStr}`;
    }

    return yearStr;
  };

  // Build new date string based on toFormat
  const newDateParts = toFormat.map((part) => {
    if (part === 'YY' || part === 'YYYY') {
      const fromType = fromFormat.find(
        (fPart) => fPart === 'YYYY' || fPart === 'YY',
      );

      return convertYear(dateMap[fromType], fromType, part);
    }

    return dateMap[part];
  });

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
