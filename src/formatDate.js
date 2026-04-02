'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date
    .split(fromFormat[3])
    .map((part, index, originalParts) => {
      if (toFormat[index] === 'YY' && fromFormat.includes('YYYY')) {
        return originalParts[fromFormat.indexOf('YYYY')].slice(-2);
      }

      if (toFormat[index] === 'YYYY' && fromFormat.includes('YY')) {
        if (+originalParts[fromFormat.indexOf('YY')] >= 30) {
          return '19' + originalParts[fromFormat.indexOf('YY')];
        } else {
          return '20' + originalParts[fromFormat.indexOf('YY')];
        }
      }

      return originalParts[fromFormat.indexOf(toFormat[index])];
    });

  return dateParts.join(toFormat[3]);
}

module.exports = formatDate;
