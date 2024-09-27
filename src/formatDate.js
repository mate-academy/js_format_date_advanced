'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const separator = toFormat[3];
  const dataArray = date.split(fromFormat[3]);
  const toDate = [];

  if (fromFormatCopy.includes('YYYY') && toFormat.includes('YY')) {
    const index = fromFormatCopy.indexOf('YYYY');

    fromFormatCopy[index] = 'YY';
    dataArray[index] = dataArray[index].slice(2);
  } else {
    const index = fromFormatCopy.indexOf('YY');

    fromFormatCopy[index] = 'YYYY';

    dataArray[index] = (dataArray[index] < 30 ? '20' : '19') + dataArray[index];
  }

  for (let i = 0; i < dataArray.length; i++) {
    const index = fromFormatCopy.indexOf(toFormat[i]);

    toDate.push(dataArray[index]);
  }

  return toDate.join(separator);
}

module.exports = formatDate;
