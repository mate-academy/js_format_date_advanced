'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const fromKeys = fromFormat.slice(0, -1);
  const toKeys = toFormat.slice(0, -1);

  const dateParts = date.split(fromSep);

  // Build a map from the input date
  const dateMap = fromKeys.reduce((acc, key, i) => {
    let value = dateParts[i] ?? '';

    // Normalize 2-digit year to 4-digit year
    if (key === 'YY' && value.length === 2) {
      const num = parseInt(value, 10);

      value = num < 30 ? '20' + value : '19' + value;
    }

    // Add leading zeros for day/month if needed
    if ((key === 'DD' || key === 'MM') && value.length === 1) {
      value = '0' + value;
    }

    acc[key] = value;

    return acc;
  }, {});

  // Build new date dynamically
  return toKeys
    .map((key) => {
      if (key === 'YY') {
        // If 'YY' is needed, compute from 'YYYY' in map
        let y = dateMap['YYYY'] || dateMap['YY'] || '';

        if (y.length === 4) {
          y = y.slice(-2);
        } // YYYY → YY

        return y;
      }

      if (key === 'YYYY') {
        // If 'YYYY' is needed, compute from 'YY' or use 'YYYY'
        let y = dateMap['YYYY'] || dateMap['YY'] || '';

        if (y.length === 2) {
          const num = parseInt(y, 10);

          y = num < 30 ? '20' + y : '19' + y; // YY → YYYY
        }

        return y;
      }

      return dateMap[key] ?? '';
    })
    .join(toSep);
}

module.exports = formatDate;
