'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const dateParts = date.split(oldSeparator);
  const datePartFormats = {};

  dateParts.forEach((datePart, index) => {
    const datePartName = fromFormat[index];

    datePartFormats[datePartName] = datePart;
  });

  if ('YY' in datePartFormats) {
    if (datePartFormats.YY < 30) {
      datePartFormats.YYYY = `20${datePartFormats.YY}`;
    } else {
      datePartFormats.YYYY = `19${datePartFormats.YY}`;
    }
  } else {
    datePartFormats.YY = datePartFormats.YYYY.slice(-2);
  }

  const newDateParts = [];
  const newSeparator = toFormat[3];

  toFormat.forEach((datePartName, index) => {
    const newDatePart = datePartFormats[datePartName];

    if (index !== 3) {
      newDateParts.push(newDatePart);
    }
  });

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
