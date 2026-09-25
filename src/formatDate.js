'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.at(-1);
  const dateParts = date.split(separator);
  const labels = {};
  const newDate = [];

  for (let i = 0; i < dateParts.length; i++) {
    labels[fromFormat[i]] = dateParts[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && labels['YYYY'] !== undefined) {
      newDate[i] = labels['YYYY'].slice(-2);
    } else {
      newDate[i] = labels[toFormat[i]];
    }

    if (toFormat[i] === 'YYYY' && labels['YY'] !== undefined) {
      if (Number(labels['YY']) < 30) {
        newDate[i] = '20' + labels['YY'];
      } else {
        newDate[i] = '19' + labels['YY'];
      }
    }
  }

  const newSeparator = toFormat.at(-1);

  return newDate.join(newSeparator);
}

module.exports = formatDate;
