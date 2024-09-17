'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateOld = date.split(fromFormat[fromFormat.length - 1]);
  const dateFormats = {};
  const dateNew = [];

  for (let i = 0; i < dateOld.length; i++) {
    dateFormats[fromFormat[i]] = dateOld[i];
  }

  if (fromFormat.includes('YYYY')) {
    dateFormats.YY = dateFormats.YYYY.slice(2);
  } else if (+dateFormats.YY < 30) {
    dateFormats.YYYY = 20 + dateFormats.YY;
  } else {
    dateFormats.YYYY = 19 + dateFormats.YY;
  }

  for (let i = 0; i < toFormat.length; i++) {
    for (const key in dateFormats) {
      if (toFormat[i] === key) {
        dateNew[i] = dateFormats[key];
      }
    }
  }

  return dateNew.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
