'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const values = date.split(/[^0-9]/);

  const newDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const partName = toFormat[i];

    const indexInFrom = fromFormat.indexOf(
      partName === 'YY' ? 'YYYY' : partName,
    );

    let value = values[indexInFrom];

    if (partName === 'YY' && value.length === 4) {
      value = value.slice(-2);
    } else if (partName === 'YYYY' && value.length === 2) {
      value = Number(value) < 30 ? '20' + value : '19' + value;
    }

    newDateParts.push(value);
  }

  const separator = '.';
  const newDate = newDateParts.join(separator);

  return newDate;
}

module.exports = formatDate;
