'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newData = date.split(separator);
  const newSeparator = toFormat.pop();
  const dateParts = {};

  for (let i = 0; i < newData.length; i++) {
    dateParts[fromFormat[i]] = newData[i];

    if (fromFormat[i] === 'YY') {
      dateParts.YYYY = newData[i] < 30 ? '20' + newData[i] : '19' + newData[i];
    } else if (fromFormat[i] === 'YYYY') {
      dateParts.YY = newData[i].substring(2);
    }
  }

  return toFormat.map((part) => dateParts[part]).join(newSeparator);
}

module.exports = formatDate;
