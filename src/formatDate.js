'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newData = date.split(oldSeparator);
  const newFormat = Array.from(toFormat);
  const newSeparator = newFormat.pop();
  const dataObject = {};

  for (let i = 0; i < newData.length; i++) {
    dataObject[fromFormat[i]] = newData[i];

    if (fromFormat[i] === 'YY') {
      dataObject.YYYY = newData[i] < 30 ? '20' + newData[i] : '19' + newData[i];
    } else if (fromFormat[i] === 'YYYY') {
      dataObject.YY = newData[i].substring(2);
    }
  }

  return newFormat.map((datePart) => dataObject[datePart]).join(newSeparator);
}

module.exports = formatDate;
