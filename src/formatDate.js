'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = Array.from(fromFormat).pop();
  const newFormat = Array.from(toFormat);
  const newSeparator = newFormat.pop();
  const dataObject = {};

  for (const value of date.split(oldSeparator)) {
    const key = fromFormat.shift();

    dataObject[key] = value;

    if (key === 'YY') {
      dataObject.YYYY = value < 30 ? '20' + value : '19' + value;
    } else if (key === 'YYYY') {
      dataObject.YY = value.substring(2);
    }
  }

  return newFormat.map(e => dataObject[e]).join(newSeparator);
}

module.exports = formatDate;
