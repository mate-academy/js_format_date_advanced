'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromDateArray = date.split(fromFormat[fromFormat.length - 1]);
  const toDateArray = [...fromDateArray];

  for (let i = 0; i < 3; i += 1) {
    const toFormatItem = toFormat[i];

    for (let j = 0; j < 3; j += 1) {
      if (toFormatItem === 'YY') {
        if (fromFormat[j] === 'YY') {
          toDateArray[i] = fromDateArray[j];
        } else if (fromFormat[j] === 'YYYY') {
          toDateArray[i] = fromDateArray[j].substring(2);
        }
      } else if (toFormatItem === 'YYYY') {
        if (fromFormat[j] === 'YY') {
          const year = Number(fromDateArray[j]);

          if (year >= 30) {
            toDateArray[i] = '19' + fromDateArray[j];
          } else {
            toDateArray[i] = '20' + fromDateArray[j];
          }
        } else if (fromFormat[j] === 'YYYY') {
          toDateArray[i] = fromDateArray[j];
        }
      } else if (fromFormat[j] === toFormatItem) {
        toDateArray[i] = fromDateArray[j];
      }
    }
  }

  return toDateArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
