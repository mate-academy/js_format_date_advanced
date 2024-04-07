'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateDetails = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      if (toFormat[i] === 'YY' && fromFormat[k] === 'YYYY') {
        newDate.push(dateDetails[k].slice(2, 4));
        break;
      }

      if (toFormat[i] === 'YYYY' && fromFormat[k] === 'YY') {
        if (dateDetails[k] < 30) {
          newDate.push(`20${dateDetails[k]}`);
          break;
        }

        newDate.push(`19${dateDetails[k]}`);
        break;
      }

      if (toFormat[i] === fromFormat[k]) {
        newDate.push(dateDetails[k]);
        break;
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
