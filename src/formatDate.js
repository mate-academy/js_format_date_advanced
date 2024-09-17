'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInArr = date.split(fromFormat[fromFormat.length - 1]);

  const dateInObj = {
    [fromFormat[0]]: dateInArr[0],
    [fromFormat[1]]: dateInArr[1],
    [fromFormat[2]]: dateInArr[2],
  };

  const dateOutObj = {
    [toFormat[0]]: '',
    [toFormat[1]]: '',
    [toFormat[2]]: '',
  };

  for (const key of Object.keys(dateOutObj)) {
    if (fromFormat.includes(key)) {
      dateOutObj[key] = dateInObj[key];
    } else {
      if ((key === 'YYYY')) {
        if (dateInObj['YY'] < 30) {
          dateOutObj[key] = 20 + dateInObj['YY'];
        } else {
          dateOutObj[key] = 19 + dateInObj['YY'];
        }
      }

      if ((key === 'YY')) {
        dateOutObj[key] = (dateInObj['YYYY'].slice(2));
      }
    }
  }

  return Object.values(dateOutObj).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
