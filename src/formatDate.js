'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const copyFromFormat = [...fromFormat];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldData = date.split(oldSeparator);
  const newData = [];

  for (let i = 0; i < oldData.length; i++) {
    const fromIndex = copyFromFormat.indexOf(copyFromFormat[i]);

    if (copyFromFormat[i] === 'YYYY' && toFormat[fromIndex] === 'YY') {
      oldData[i] = oldData[i].slice(2);

      copyFromFormat[i] = 'YY';
    }

    if (copyFromFormat[i] === 'YY' && toFormat[fromIndex] === 'YYYY') {
      oldData[i] = +oldData[i] < 30 ? '20' + oldData[i] : '19' + oldData[i];

      copyFromFormat[i] = 'YYYY';
    }

    const toIndex = toFormat.indexOf(copyFromFormat[i]);

    newData[toIndex] = oldData[i];
  }

  return newData.join(newSeparator);
}

module.exports = formatDate;
