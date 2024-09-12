'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parsedDate = {};
  let finalDate = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const dataType = fromFormat[i][0].toLowerCase();

    parsedDate[dataType] = date.split(fromFormat[3])[i];

    if (dataType === 'y') {
      parsedDate[dataType] = parsedDate[dataType].slice(-2);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const dataType = toFormat[i][0].toLowerCase();

    if (dataType === 'y' && toFormat[i].length === 4) {
      finalDate += +parsedDate[dataType] < 30
        ? '20'
        : '19';
    }
    finalDate += parsedDate[dataType];

    if (i !== 2) {
      finalDate += toFormat[3];
    }
  }

  return finalDate;
}

module.exports = formatDate;
