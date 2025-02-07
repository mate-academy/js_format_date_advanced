'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const newFormatArray = [];
  const copyToFormat = [...toFormat];

  if (copyToFormat.includes('YYYY')) {
    copyToFormat[copyToFormat.indexOf('YYYY')] = 'YY';
  }

  for (let i = 0; i <= 2; i++) {
    const index = copyToFormat.indexOf(fromFormat[i].slice(0, 2));

    if (toFormat[index] === 'YY') {
      newFormatArray[index] =
        dateArray[i].length > 2 ? dateArray[i].slice(2) : dateArray[i];
    } else if (toFormat[index] === 'YYYY') {
      newFormatArray[index] =
        dateArray[i].length > 2
          ? dateArray[i]
          : +dateArray[i] >= 30
            ? '19' + dateArray[i]
            : '20' + dateArray[i];
    } else {
      newFormatArray[index] = dateArray[i];
    }
  }

  return newFormatArray.join(toFormat[3]);
}

module.exports = formatDate;
