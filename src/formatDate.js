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
  const result = [];

  for (let i = 0; i < formatDate.length; i++) {
    let index = toFormat.indexOf(fromFormat[i]);

    if (index === -1) {
      switch (fromFormat[i]) {
        case 'YY':
          if (splitDate[i] < 30) {
            splitDate[i] = '20' + splitDate[i];
          } else {
            splitDate[i] = '19' + splitDate[i];
          }
          index = toFormat.indexOf('YYYY');
          break;
        case 'YYYY':
          splitDate[i] = splitDate[i].slice(2);
          index = toFormat.indexOf('YY');
          break;
      }
    }

    result[index] = splitDate[i];
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
