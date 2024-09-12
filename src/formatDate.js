'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(fromFormat[3]);
  const newFormat = [];

  for (let i = 0; i < newDate.length; i++) {
    for (let j = 0; j < newDate.length; j++) {
      if (toFormat[i] === fromFormat[j]) {
        newFormat.splice(i, 0, newDate[j]);
      }

      if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
        const newFormatYear = newDate[j].substring(2);

        newFormat.splice(i, 0, newFormatYear);
      }

      if (toFormat[i] === 'YYYY' && fromFormat[j] === 'YY') {
        let dateFormat = 0;

        if (newDate[j] >= 30) {
          dateFormat = `19${newDate[j]}`;
        } else {
          dateFormat = `20${newDate[j]}`;
        }

        newFormat.splice(i, 0, dateFormat);
      }
    }
  }

  const format = newFormat.join(toFormat[3]);

  return format;
}

module.exports = formatDate;
