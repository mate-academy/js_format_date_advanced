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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const formattedDateParts = [];
  const objDateFrom = {};

  for (let i = 0; i < dateParts.length; i++) {
    objDateFrom[fromFormat[i]] = dateParts[i];
  }

  for (const datePart in objDateFrom) {
    const dateValue = objDateFrom[datePart];

    if (toFormat.includes(datePart)) {
      formattedDateParts[toFormat.indexOf(datePart)] = dateValue;
      continue;
    }

    if (datePart.length === 4) {
      formattedDateParts[toFormat.indexOf('YY')] = dateValue.slice(2);
      continue;
    }

    if (datePart.length === 2) {
      formattedDateParts[toFormat.indexOf('YYYY')] = dateValue < 30
        ? '20' + dateValue
        : '19' + dateValue;
    }
  }

  return formattedDateParts.join(toSeparator);
}

module.exports = formatDate;
