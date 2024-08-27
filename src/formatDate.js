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
  const newFormat = Array.from(toFormat);
  const newSeparator = newFormat.pop();
  const obj = {};

  for (let i = 0; i < newData.length; i++) {
    obj[fromFormat[i]] = newData[i];

    if (fromFormat[i] === 'YY') {
      obj.YYYY = newData[i] >= 30 ? '19' + newData[i] : '20' + newData[i];
    } else if (fromFormat[i] === 'YYYY') {
      obj.YY = newData[i].substring(2);
    }
  }

  return newFormat.map((part) => obj[part]).join(newSeparator);
}

module.exports = formatDate;
