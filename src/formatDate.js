'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const dateFormatted = [];
  const dateBeforeFormatArr = date.split(fromFormat[fromFormat.length - 1]);
  const separatorFormatted = toFormat[toFormat.length - 1];

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateBeforeFormatArr[i];
  }

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    if (key in dateObj) {
      dateFormatted.push(dateObj[key]);
    }

    if (!(key in dateObj)) {
      switch (true) {
        case toFormat.includes('YY'):
          dateFormatted.push(dateObj.YYYY.slice(-2));
          break;

        case toFormat.includes('YYYY'):
          if (+dateObj.YY < 30) {
            dateFormatted.push('20' + dateObj.YY);
          }

          if (+dateObj.YY >= 30) {
            dateFormatted.push('19' + dateObj.YY);
          }
          break;
      }
    }
  }

  return dateFormatted.join(separatorFormatted);
}

module.exports = formatDate;
