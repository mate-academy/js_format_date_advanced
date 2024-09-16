'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const oldFormat = date.split(separatorFrom);
  const newFormat = [];

  for (let i = 0; i < oldFormat.length; i++) {
    if (fromFormat[i].includes('Y') && toFormat.indexOf(fromFormat[i]) < 0) {
      if (fromFormat[i] === 'YYYY') {
        oldFormat[i] = oldFormat[i].slice(-2);

        newFormat[toFormat.indexOf('YY')] = oldFormat[i];
      } else if (fromFormat[i] === 'YY') {
        const century = +oldFormat[i] < 30 ? 20 : 19;

        newFormat[toFormat.indexOf('YYYY')] = century + oldFormat[i];
      }
    } else {
      newFormat[toFormat.indexOf(fromFormat[i])] = oldFormat[i];
    }
  }

  return newFormat.join(separatorTo);
}

module.exports = formatDate;
