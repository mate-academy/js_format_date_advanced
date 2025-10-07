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

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  const newParts = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];
    let value = dateMap[part];

    if (value === undefined) {
      if (part === 'YYYY') {
        value = dateMap['YY'];
      } else if (part === 'YY') {
        value = dateMap['YYYY'];
      }
    }

    if (part === 'YYYY' && value.length === 2) {
      value = Number(value) < 30 ? `20${value}` : `19${value}`;
    } else if (part === 'YY' && value.length === 4) {
      value = value.slice(2);
    }

    newParts.push(value);
  }

  return newParts.join(separatorTo);
}

module.exports = formatDate;
