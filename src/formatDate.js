'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[toFormat.length - 1];
  const partsFormat = toFormat.slice(0, -1);
  const values = date.split(/[^0-9]+/).filter(Boolean);

  const newDateParts = partsFormat.map((partName) => {
    let indexInFrom;

    if (partName === 'YYYY') {
      indexInFrom = fromFormat.indexOf('YYYY');

      if (indexInFrom === -1) {
        indexInFrom = fromFormat.indexOf('YY');
      }
    } else if (partName === 'YY') {
      indexInFrom = fromFormat.indexOf('YY');

      if (indexInFrom === -1) {
        indexInFrom = fromFormat.indexOf('YYYY');
      }
    } else {
      indexInFrom = fromFormat.indexOf(partName);
    }

    if (indexInFrom === -1) {
      return '';
    }

    let value = values[indexInFrom];

    if (!value) {
      return '';
    }


    if (partName === 'YY' && value.length === 4) {
      value = value.slice(-2);
    } else if (partName === 'YYYY' && value.length === 2) {
      value = Number(value) < 30 ? '20' + value : '19' + value;
    }

    return value;
  });

  return newDateParts.join(separator);
}

module.exports = formatDate;
