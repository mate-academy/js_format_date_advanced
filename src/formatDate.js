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

  const dateArray = date.split(fromFormat[3]);
  const dateFromObj = {
    [fromFormat[0]]: dateArray[0],
    [fromFormat[1]]: dateArray[1],
    [fromFormat[2]]: dateArray[2],
  };
  let result = '';

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (toFormat[i].slice(0, 1) === Object.keys(dateFromObj)[j].slice(0, 1)) {
        const n = Math.sign(
          toFormat[i].length - Object.keys(dateFromObj)[j].length,
        );

        switch (n) {
          case 0:
            result += Object.values(dateFromObj)[j] + toFormat[3];
            break;
          case -1:
            result += Object.values(dateFromObj)[j].slice(2) + toFormat[3];
            break;
          case 1:
            if (parseInt(Object.values(dateFromObj)[j]) < 30) {
              result += '20' + Object.values(dateFromObj)[j] + toFormat[3];
            } else if (parseInt(Object.values(dateFromObj)[j]) >= 30) {
              result += '19' + Object.values(dateFromObj)[j] + toFormat[3];
            }
            break;
        }
      }
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
