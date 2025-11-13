'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const currentDate = {};
  const newDate = [];

  for (let i = 0; i < splitDate.length; i++) {
    currentDate[fromFormat[i]] = splitDate[i];
  }

  const convertedDate = { ...currentDate };

  for (let i = 0; i < splitDate.length; i++) {
    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      convertedDate.YYYY = currentDate.YYYY;
      convertedDate.YY = currentDate.YYYY.slice(-2);
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      if (Number(currentDate.YY) < 30) {
        convertedDate.YY = currentDate.YY;
        convertedDate.YYYY = Number(currentDate.YY) + 2000;
      } else {
        convertedDate.YY = currentDate.YY;
        convertedDate.YYYY = Number(currentDate.YY) + 1900;
      }
    }
    newDate.push(convertedDate[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
