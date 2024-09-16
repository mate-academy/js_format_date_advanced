'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormatDate = [];
  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const spectatorTo = toFormat[toFormat.length - 1];
  const spectatorFrom = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(spectatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        newFormatDate[j] = dateParts[i];
      }

      if (fromFormat[i] === FULL_YEAR && toFormat[j] === SHORT_YEAR) {
        newFormatDate[j] = dateParts[i].slice(2);
      }

      if (fromFormat[i] === SHORT_YEAR && toFormat[j] === FULL_YEAR) {
        newFormatDate[j] = (dateParts[i] < 30 ? `20${dateParts[i]}` : `19${dateParts[i]}`);
      }
    }
  }

  return newFormatDate.join(spectatorTo);
}

module.exports = formatDate;
