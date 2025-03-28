'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];

  if (!separatorFrom || !separatorTo) {
    throw new Error('Invalid: Missing separator in fromFormat or toFormat');
  }

  // Split date string using the input separator
  const dateParts = date.split(separatorFrom);
  const dateObject = {};

  // Map the date parts to the fromFormat array
  fromFormat.slice(0, -1).forEach((part, index) => {
    dateObject[part] = dateParts[index];
  });

  // Handle year conversion
  if (dateObject['YYYY'] !== undefined) {
    if (toFormat.includes('YY')) {
      dateObject['YY'] = dateObject['YYYY'].slice(-2);
    }
  } else if (dateObject['YY'] !== undefined) {
    const year = parseInt(dateObject['YY'], 10);

    if (year < 30) {
      dateObject['YYYY'] = `20${dateObject['YY']}`;
    } else {
      dateObject['YYYY'] = `19${dateObject['YY']}`;
    }
  }

  // Build the new date string
  const newDateParts = toFormat.slice(0, -1).map((part) => dateObject[part]);

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
