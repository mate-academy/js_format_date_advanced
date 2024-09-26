'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const dateArray = date.split(separatorFrom);
  const object = {};
  let formattedDate = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const partFrom = fromFormat[i];

    object[partFrom] = dateArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const partTo = toFormat[i];

    if (partTo === 'YYYY') {
      if (object.YYYY) {
        formattedDate += object['YYYY'];
      }

      if (object.YY) {
        formattedDate += object['YY'] < 30
          ? '20' + object['YY']
          : '19' + object['YY'];
      }
    } else if (partTo === 'YY') {
      if (object.YYYY) {
        formattedDate += object['YYYY'].slice(-2);
      }

      if (object.YY) {
        formattedDate += object['YY'];
      }
    } else {
      formattedDate += object[partTo];
    }

    if (i < toFormat.length - 2) {
      formattedDate += toFormat[3];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
